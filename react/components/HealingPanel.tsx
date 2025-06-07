import React, { useRef, forwardRef } from 'react';
import { useHealingFx } from '../useHealingFx';
import { Preset, HealingFxOptions } from '../../types/healing.types';

interface HealingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?: Preset;
  healingOptions?: HealingFxOptions;
}

export const HealingPanel = forwardRef<HTMLDivElement, HealingPanelProps>(
  ({ preset = 'float', healingOptions = {}, children, className = '', ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const ref = forwardedRef || internalRef;
    
    useHealingFx(ref as React.RefObject<HTMLDivElement>, preset, {
      intensity: 0.3,
      speed: 0.8,
      ...healingOptions
    });

    return (
      <div
        ref={ref}
        className={`healing-panel ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HealingPanel.displayName = 'HealingPanel';