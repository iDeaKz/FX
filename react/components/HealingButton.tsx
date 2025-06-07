/**
 * Pre-built Healing Components
 * Drop-in replacements with built-in effects
 */

import React, { useRef, forwardRef } from 'react';
import { useHealingFx } from '../useHealingFx';
import { Preset, HealingFxOptions } from '../../types/healing.types';

interface HealingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  preset?: Preset;
  healingOptions?: HealingFxOptions;
}

export const HealingButton = forwardRef<HTMLButtonElement, HealingButtonProps>(
  ({ preset = 'bounce', healingOptions = {}, children, className = '', ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const ref = forwardedRef || internalRef;
    
    useHealingFx(ref as React.RefObject<HTMLButtonElement>, preset, {
      intensity: 0.8,
      speed: 1.2,
      ...healingOptions
    });

    return (
      <button
        ref={ref}
        className={`healing-button ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

HealingButton.displayName = 'HealingButton';