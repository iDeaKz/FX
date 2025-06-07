/**
 * HealingFX - Game UI Effects Library
 * 20KB of pure animation magic
 */

// Core exports
export { HealingEngine } from './core/healing-engine';
export { HEALING_PRESETS, getPresetCoeffs, isProPreset } from './presets/healing-presets';

// Types
export type {
  HealingCoeffs,
  AnimationParams,
  Preset,
  TransformState,
  HealingFxOptions
} from './types/healing.types';

// React hooks and components
export { useHealingFx } from './react/useHealingFx';
export { HealingButton } from './react/components/HealingButton';
export { HealingPanel } from './react/components/HealingPanel';

// Version and metadata
export const VERSION = '1.0.0';
export const IS_PRO = false; // Set by build process

// Default coefficients for easy customization
export const defaultHealingCoeffs = HEALING_PRESETS.bounce;