/**
 * Dev-mode controls for live tweaking
 * Uses Leva for parameter adjustment
 */

import React from 'react';
import { useControls } from 'leva';
import { HealingCoeffs, Preset } from '../../types/healing.types';

interface HealingControlsProps {
  preset: Preset;
  onCoeffsChange: (coeffs: Partial<HealingCoeffs>) => void;
}

export function HealingControls({ preset, onCoeffsChange }: HealingControlsProps) {
  const controls = useControls(`HealingFX - ${preset}`, {
    intensity: { value: 1, min: 0, max: 3, step: 0.1 },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    damping: { value: 0, min: 0, max: 2, step: 0.1 },
    timeScale: { value: 1, min: 0.1, max: 3, step: 0.1 },
    n: { value: 2, min: 1, max: 8, step: 1 }
  });

  React.useEffect(() => {
    onCoeffsChange({
      damping: controls.damping,
      timeScale: controls.timeScale,
      n: controls.n
    });
  }, [controls, onCoeffsChange]);

  return null; // Leva handles the UI
}