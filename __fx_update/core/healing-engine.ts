/**
 * Core Healing Engine - Pure vanilla TypeScript
 * No dependencies, maximum performance
 */

import { HealingCoeffs, TransformState, Preset } from '../types/healing.types';

export class HealingEngine {
  private startTime: number = 0;
  private animationId: number | null = null;
  private isRunning: boolean = false;
  private animateCallback: (currentTime: number) => void;
  
  constructor(
    private coeffs: HealingCoeffs,
    private updateCallback: (state: TransformState) => void,
    private completeCallback?: () => void
  ) {
    // Hoist animate callback to prevent GC churn
    this.animateCallback = this.createAnimateCallback();
  }

  /**
   * Core H(t) function - The mathematical heart
   */
  private calculateH(t: number): number {
    let result = 0;
    const { n, A, B, phi, damping = 0, timeScale = 1 } = this.coeffs;
    const scaledT = t * timeScale;
    
    for (let k = 0; k < n; k++) {
      const amplitude = A[k] ? A[k](scaledT) : 1;
      const frequency = B[k] ? B[k](scaledT) : 1;
      const phase = phi[k] || 0;
      
      result += amplitude * Math.sin(frequency * scaledT + phase);
    }
    
    // Apply damping
    if (damping > 0) {
      result *= Math.exp(-damping * scaledT);
    }
    
    return result;
  }

  /**
   * Transform H(t) into visual effects - NOW WITH REAL MATH
   */
  private transformState(h: number, t: number): TransformState {
    // Map scalar h to meaningful transforms using parametric curves
    const intensity = Math.abs(h);
    const direction = Math.sign(h);
    
    // Organic motion using sine/cosine offsets
    const wobbleX = h * 8 * Math.cos(t * 2.1);
    const wobbleY = h * 6 * Math.sin(t * 1.7);
    
    // Dynamic scaling based on harmonic intensity
    const pulseScale = 1 + (intensity * 0.15 * Math.sin(t * 3.3));
    
    // Rotation with momentum
    const rotation = h * 45 * Math.sin(t * 0.8);
    
    // Opacity breathing
    const opacity = Math.max(0.1, 1 - intensity * 0.3);
    
    return {
      x: wobbleX,
      y: wobbleY,
      scaleX: pulseScale,
      scaleY: pulseScale * (1 + direction * 0.05),
      rotation,
      opacity
    };
  }

  private createAnimateCallback() {
    return (currentTime: number) => {
      if (!this.isRunning) return;
      
      const t = (currentTime - this.startTime) / 1000; // Convert to seconds
      const h = this.calculateH(t);
      const state = this.transformState(h, t);
      
      this.updateCallback(state);
      
      this.animationId = requestAnimationFrame(this.animateCallback);
    };
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.startTime = performance.now();
    this.animationId = requestAnimationFrame(this.animateCallback);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.completeCallback?.();
  }

  pause(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}