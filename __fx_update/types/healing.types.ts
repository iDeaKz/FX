/**
 * Type definitions for HealingFX
 */

export interface HealingCoeffs {
  n: number;
  A: Array<(t: number) => number>;
  B: Array<(t: number) => number>;
  phi: number[];
  damping?: number;
  timeScale?: number;
}

export interface TransformState {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
}

export interface AnimationParams {
  duration: number;
  intensity: number;
  easing: string;
  autoStart: boolean;
}

export interface HealingFxOptions extends Partial<AnimationParams> {
  preset?: string;
  coeffs?: Partial<HealingCoeffs>;
  onComplete?: () => void;
  onUpdate?: (state: TransformState) => void;
}

export type Preset = 
  | 'gentle' 
  | 'bounce' 
  | 'shake' 
  | 'glitch' 
  | 'pulse' 
  | 'wave' 
  | 'chaos'
  | 'pro_quantum'
  | 'pro_neural'
  | 'pro_fractal';