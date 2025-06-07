/**
 * Healing Presets - Deterministic chaos
 */

import { HealingCoeffs } from '../types/healing.types';

// Seeded PRNG for reproducible "randomness"
class SeededRandom {
  private seed: number;
  
  constructor(seed: number = 42) {
    this.seed = seed;
  }
  
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

const rng = new SeededRandom(42);

export type Preset = 
  | 'gentle' 
  | 'bounce' 
  | 'shake' 
  | 'glitch' 
  | 'pulse' 
  | 'wave' 
  | 'chaos'
  | 'pro_quantum'    // Pro-only
  | 'pro_neural'     // Pro-only
  | 'pro_fractal';   // Pro-only

export type BasicPreset = Extract<Preset, 'gentle' | 'bounce' | 'shake' | 'glitch' | 'pulse' | 'wave' | 'chaos'>;
export type ProPreset = Extract<Preset, 'pro_quantum' | 'pro_neural' | 'pro_fractal'>;

// Pre-computed noise lookup for performance
const NOISE_TABLE = Array.from({ length: 256 }, () => rng.next() * 2 - 1);
const noise = (t: number) => NOISE_TABLE[Math.floor(t * 10) % 256];

export const PRESETS: Record<Preset, HealingCoeffs> = {
  gentle: {
    n: 2,
    A: [() => 1, () => 0.5],
    B: [() => 1, () => 2],
    phi: [0, Math.PI / 4],
    damping: 0.1,
    timeScale: 0.8
  },
  
  bounce: {
    n: 3,
    A: [(t) => Math.max(0.1, 1 - t * 0.1), () => 0.7, () => 0.3],
    B: [() => 2, () => 4, () => 6],
    phi: [0, Math.PI / 2, Math.PI],
    damping: 0.05,
    timeScale: 1.2
  },
  
  shake: {
    n: 4,
    A: [() => 1, () => 0.8, () => 0.6, () => 0.4],
    B: [(t) => 8 + noise(t), (t) => 12 + noise(t * 1.3), (t) => 16 + noise(t * 0.7), (t) => 20 + noise(t * 2.1)],
    phi: [0, Math.PI / 3, Math.PI / 2, Math.PI],
    damping: 0.03,
    timeScale: 1.5
  },
  
  glitch: {
    n: 5,
    A: [(t) => noise(t * 5), () => 0.8, (t) => noise(t * 3), () => 0.6, (t) => noise(t * 7)],
    B: [(t) => 15 + noise(t * 2) * 5, (t) => 25 + noise(t * 1.5) * 8, (t) => 35 + noise(t * 2.5) * 3, (t) => 45 + noise(t * 0.8) * 12, (t) => 55 + noise(t * 3.2) * 6],
    phi: [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2],
    damping: 0,
    timeScale: 2
  },
  
  pulse: {
    n: 2,
    A: [(t) => Math.abs(Math.sin(t * 0.5)), (t) => Math.abs(Math.cos(t * 0.3))],
    B: [() => 3, () => 6],
    phi: [0, Math.PI / 2],
    damping: 0,
    timeScale: 1
  },
  
  wave: {
    n: 3,
    A: [() => 1, (t) => 0.8 * Math.sin(t * 0.2), (t) => 0.6 * Math.cos(t * 0.15)],
    B: [() => 1, () => 2, () => 3],
    phi: [0, Math.PI / 4, Math.PI / 2],
    damping: 0.02,
    timeScale: 0.6
  },
  
  chaos: {
    n: 7,
    A: Array.from({ length: 7 }, (_, i) => (t: number) => (1 - i * 0.1) * Math.abs(noise(t * (i + 1)))),
    B: Array.from({ length: 7 }, (_, i) => (t: number) => (i + 1) * 3 + noise(t * (i + 0.5)) * 2),
    phi: Array.from({ length: 7 }, (_, i) => (i * Math.PI) / 7),
    damping: 0.01,
    timeScale: 1.8
  },
  
  // Pro presets
  pro_quantum: {
    n: 8,
    A: Array.from({ length: 8 }, (_, i) => (t: number) => Math.exp(-t * 0.05) * Math.sin(t * (i + 1) * 0.1)),
    B: Array.from({ length: 8 }, (_, i) => (t: number) => Math.pow(2, i) + noise(t * Math.PI)),
    phi: Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4),
    damping: 0.08,
    timeScale: 1.4
  },
  
  pro_neural: {
    n: 12,
    A: Array.from({ length: 12 }, (_, i) => (t: number) => 1 / (1 + Math.exp(-t + i))), // Sigmoid
    B: Array.from({ length: 12 }, (_, i) => (t: number) => (i + 1) * 2 * Math.tanh(t * 0.1)),
    phi: Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6),
    damping: 0.06,
    timeScale: 0.9
  },
  
  pro_fractal: {
    n: 16,
    A: Array.from({ length: 16 }, (_, i) => (t: number) => Math.pow(0.5, i) * Math.sin(t * Math.pow(2, i % 4))),
    B: Array.from({ length: 16 }, (_, i) => (t: number) => Math.pow(2, i % 5) + noise(t * (i + 1))),
    phi: Array.from({ length: 16 }, (_, i) => (i * Math.PI) / 8),
    damping: 0.04,
    timeScale: 1.1
  }
};