import { useEffect, useRef, RefObject } from 'react';
import { HealingEngine } from '../core/healing-engine';
import { PRESETS, Preset, BasicPreset, ProPreset } from '../presets/healing-presets';
import { HealingFxOptions, TransformState } from '../types/healing.types';

interface LicenseContext {
  isProLicensed: boolean;
  checkLicense: () => Promise<boolean>;
}

// TODO: Replace with real license API
const useLicense = (): LicenseContext => ({
  isProLicensed: false, // Will be replaced with real license check
  checkLicense: async () => false
});

interface UseHealingFxProps {
  preset: Preset;
  intensity?: number;
  duration?: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

export function useHealingFx(
  elementRef: RefObject<HTMLElement>,
  { preset, intensity = 1, duration = 2000, autoStart = false, onComplete }: UseHealingFxProps
) {
  const engineRef = useRef<HealingEngine | null>(null);
  const { isProLicensed } = useLicense();
  
  // Validate pro preset access
  const isProPreset = (preset: Preset): preset is ProPreset => 
    preset.startsWith('pro_');
  
  const effectivePreset = isProPreset(preset) && !isProLicensed 
    ? 'gentle' as BasicPreset 
    : preset;

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const coeffs = PRESETS[effectivePreset];
    
    // Apply intensity scaling to coefficients
    const scaledCoeffs = {
      ...coeffs,
      A: coeffs.A.map(fn => (t: number) => fn(t) * intensity)
    };

    const updateCallback = (state: TransformState) => {
      if (!element) return;
      
      const transform = [
        `translateX(${state.x}px)`,
        `translateY(${state.y}px)`,
        `scaleX(${state.scaleX})`,
        `scaleY(${state.scaleY})`,
        `rotate(${state.rotation}deg)`
      ].join(' ');

      element.style.transform = transform;
      element.style.opacity = state.opacity.toString();
    };

    const completeCallback = () => {
      // Reset transform
      if (element) {
        element.style.transform = '';
        element.style.opacity = '';
      }
      onComplete?.();
    };

    const engine = new HealingEngine(scaledCoeffs, updateCallback, completeCallback);
    engineRef.current = engine;

    if (autoStart) {
      engine.start();
      
      // Auto-stop after duration
      if (duration > 0) {
        setTimeout(() => engine.stop(), duration);
      }
    }

    return () => {
      engine.stop();
    };
  }, [effectivePreset, intensity, duration, autoStart, onComplete]); // Fixed dependency array

  return {
    start: () => engineRef.current?.start(),
    stop: () => engineRef.current?.stop(),
    pause: () => engineRef.current?.pause(),
    isProPreset: isProPreset(preset),
    hasProAccess: isProLicensed
  };
}