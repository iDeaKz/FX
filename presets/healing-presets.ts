/**
 * Healing Animation Presets
 * Each preset defines unique H(t) coefficients for specific effects
 */

import { HealingCoeffs, Preset } from '../types/healing.types';

export const HEALING_PRESETS: Record<Preset, HealingCoeffs> = {
  bounce: {
    n: 2,
    A: [
      (t) => Math.max(0, 1 - t * 0.5), // Decay amplitude
      (t) => 0.3 * Math.sin(t * 0.5)   // Secondary bounce
    ],
    B: [
      (t) => 8 + t * 2,  // Increasing frequency
      (t) => 16          // Fixed harmonic
    ],
    phi: [0, Math.PI / 4],
    damping: 0.8,
    timeScale: 1.2
  },

  wiggle: {
    n: 3,
    A: [
      (t) => 0.8,
      (t) => 0.4 * Math.sin(t * 0.3),
      (t) => 0.2
    ],
    B: [
      (t) => 6,
      (t) => 12 + Math.sin(t) * 2,
      (t) => 18
    ],
    phi: [0, Math.PI / 3, Math.PI / 6],
    timeScale: 1.0
  },

  pulse: {
    n: 1,
    A: [(t) => 1],
    B: [(t) => 4 * Math.PI],
    phi: [0],
    timeScale: 0.8
  },

  rotate: {
    n: 2,
    A: [
      (t) => 1,
      (t) => 0.3 * Math.cos(t * 0.2)
    ],
    B: [
      (t) => 2 * Math.PI,
      (t) => 4 * Math.PI
    ],
    phi: [0, Math.PI / 2],
    timeScale: 0.5
  },

  shake: {
    n: 4,
    A: [
      (t) => 0.6,
      (t) => 0.4,
      (t) => 0.3,
      (t) => 0.2
    ],
    B: [
      (t) => 20 + Math.random() * 5,
      (t) => 35 + Math.random() * 8,
      (t) => 50 + Math.random() * 10,
      (t) => 80 + Math.random() * 15
    ],
    phi: [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4],
    timeScale: 2.0
  },

  float: {
    n: 2,
    A: [
      (t) => 1,
      (t) => 0.5 * Math.sin(t * 0.1)
    ],
    B: [
      (t) => 1.5,
      (t) => 3
    ],
    phi: [0, Math.PI / 6],
    timeScale: 0.3
  },

  // Pro Presets
  quake: {
    n: 6,
    A: [
      (t) => 2.0 * Math.exp(-t * 0.5),
      (t) => 1.5 * Math.exp(-t * 0.3),
      (t) => 1.0 * Math.exp(-t * 0.8),
      (t) => 0.8,
      (t) => 0.6,
      (t) => 0.4
    ],
    B: [
      (t) => 15 + Math.random() * 20,
      (t) => 30 + Math.random() * 25,
      (t) => 45 + Math.random() * 30,
      (t) => 60 + Math.random() * 15,
      (t) => 80 + Math.random() * 10,
      (t) => 100 + Math.random() * 5
    ],
    phi: [0, Math.PI / 8, Math.PI / 4, 3 * Math.PI / 8, Math.PI / 2, 5 * Math.PI / 8],
    damping: 1.2,
    timeScale: 3.0
  },

  glitch: {
    n: 8,
    A: Array(8).fill(0).map((_, i) => 
      (t: number) => (Math.random() > 0.7 ? 1 : 0) * (0.8 - i * 0.1)
    ),
    B: Array(8).fill(0).map((_, i) => 
      (t: number) => (i + 1) * 40 + Math.random() * 60
    ),
    phi: Array(8).fill(0).map((_, i) => i * Math.PI / 4),
    timeScale: 4.0
  },

  ripple: {
    n: 5,
    A: [
      (t) => Math.exp(-t * 0.2),
      (t) => 0.8 * Math.exp(-t * 0.3),
      (t) => 0.6 * Math.exp(-t * 0.4),
      (t) => 0.4 * Math.exp(-t * 0.5),
      (t) => 0.2 * Math.exp(-t * 0.6)
    ],
    B: [
      (t) => 8,
      (t) => 16,
      (t) => 24,
      (t) => 32,
      (t) => 40
    ],
    phi: [0, Math.PI / 5, 2 * Math.PI / 5, 3 * Math.PI / 5, 4 * Math.PI / 5],
    damping: 0.1,
    timeScale: 1.5
  }
};

export const getPresetCoeffs = (preset: Preset): HealingCoeffs => {
  return HEALING_PRESETS[preset];
};

export const isProPreset = (preset: Preset): boolean => {
  return ['quake', 'glitch', 'ripple'].includes(preset);
};