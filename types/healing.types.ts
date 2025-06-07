/**
 * Core Healing Function Types
 * Mathematical foundation for H(t) coefficients
 */

export interface HealingCoeffs {
  /** Number of terms in the series */
  n: number;
  /** Amplitude functions A_k(t) */
  A: Array<(t: number) => number>;
  /** Frequency functions B_k(t) */
  B: Array<(t: number) => number>;
  /** Phase shifts φ_k */
  phi: number[];
  /** Damping coefficient */
  damping?: number;
  /** Time scaling factor */
  timeScale?: number;
}

export interface AnimationParams {
  intensity: number;
  speed: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  loop?: boolean;
  reverse?: boolean;
}

export type Preset = 
  | 'bounce' 
  | 'wiggle' 
  | 'pulse' 
  | 'rotate' 
  | 'shake' 
  | 'float'
  | 'quake'     // Pro preset
  | 'glitch'    // Pro preset  
  | 'ripple';   // Pro preset

export interface TransformState {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
}

export interface HealingFxOptions extends Partial<AnimationParams> {
  coeffs?: Partial<HealingCoeffs>;
  onUpdate?: (state: TransformState) => void;
  onComplete?: () => void;
}