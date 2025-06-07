/**
 * Core Healing Engine - Pure vanilla TypeScript
 * No dependencies, maximum performance
 */

import { HealingCoeffs, TransformState, Preset } from '../types/healing.types';

export class HealingEngine {
  private startTime: number = 0;
  private animationId: number | null = null;
  private isRunning: boolean = false;
  
  constructor(
    private coeffs: HealingCoeffs,
    private updateCallback: (state: TransformState) => void,
    private completeCallback?: () => void
  ) {}

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
   * Transform H(t) into visual effects
   */
  private transformState(h: number, t: number): TransformState {
    return {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      opacity: 1
    };
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.startTime = performance.now();
    
    const animate = (currentTime: number) => {
      if (!this.isRunning) return;
      
      const t = (currentTime - this.startTime) / 1000; // Convert to seconds
      const h = this.calculateH(t);
      const state = this.transformState(h, t);
      
      this.updateCallback(state);
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    this.animationId = requestAnimationFrame(animate);
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