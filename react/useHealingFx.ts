/**
 * React Hook API
 * Clean, composable, performance-optimized
 */

import { useEffect, useRef, useCallback } from 'react';
import { HealingEngine } from '../core/healing-engine';
import { getPresetCoeffs, isProPreset } from '../presets/healing-presets';
import { Preset, HealingFxOptions, TransformState } from '../types/healing.types';

export function useHealingFx(
  ref: React.RefObject<HTMLElement>,
  preset: Preset,
  options: HealingFxOptions = {}
) {
  const engineRef = useRef<HealingEngine | null>(null);
  const isProLicensed = useRef(false); // TODO: License check

  const applyTransform = useCallback((state: TransformState) => {
    if (!ref.current) return;
    
    const element = ref.current;
    const { x, y, scaleX, scaleY, rotation, opacity } = state;
    
    // Apply intensity scaling
    const intensity = options.intensity || 1;
    
    element.style.transform = `
      translate(${x * intensity}px, ${y * intensity}px)
      scale(${scaleX}, ${scaleY})
      rotate(${rotation * intensity}rad)
    `.replace(/\s+/g, ' ').trim();
    
    element.style.opacity = opacity.toString();
    
    options.onUpdate?.(state);
  }, [ref, options]);

  useEffect(() => {
    if (!ref.current) return;

    // License check for pro presets
    if (isProPreset(preset) && !isProLicensed.current) {
      console.warn(`⚡ HealingFX Pro: "${preset}" requires a pro license`);
      return;
    }

    // Get preset coefficients
    const baseCoeffs = getPresetCoeffs(preset);
    const coeffs = { ...baseCoeffs, ...options.coeffs };

    // Create engine
    engineRef.current = new HealingEngine(
      coeffs,
      applyTransform,
      options.onComplete
    );

    // Start animation
    engineRef.current.start();

    return () => {
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, [preset, options, applyTransform]);

  return {
    start: () => engineRef.current?.start(),
    stop: () => engineRef.current?.stop(),
    pause: () => engineRef.current?.pause()
  };
}