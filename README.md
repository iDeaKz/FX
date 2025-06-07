# 🎯 HealingFX - Game UI Effects Library

**20KB of pure animation magic powered by the healing function Ĥ(t)**

Transform your UI from static to spectacular with physics-inspired animations that feel alive. HealingFX brings mathematical precision to visual effects, delivering smooth, natural motion that captivates users.

## ⚡ Quick Start

```bash
npm install @ideakz/healing-fx
```

```jsx
import React from 'react';
import { HealingButton, useHealingFx } from '@ideakz/healing-fx';

function GameMenu() {
  return (
    <div>
      <HealingButton preset="bounce">Start Game</HealingButton>
      <HealingButton preset="wiggle">Settings</HealingButton>
      <HealingButton preset="pulse">Exit</HealingButton>
    </div>
  );
}
```

## 🚀 Features

### 🎨 **Six Core Presets**
- **bounce** - Elastic bouncing with decay
- **wiggle** - Organic wiggling motion  
- **pulse** - Rhythmic scaling effect
- **rotate** - Smooth rotation cycles
- **shake** - Intense vibration
- **float** - Gentle floating motion

### 🔥 **Pro Presets** (Licensed)
- **quake** - Earth-shaking intensity
- **glitch** - Digital corruption effect
- **ripple** - Expanding wave motion

### ⚙️ **React Integration**
```jsx
import { useHealingFx } from '@ideakz/healing-fx';

function CustomComponent() {
  const ref = useRef();
  
  useHealingFx(ref, 'bounce', {
    intensity: 1.5,
    speed: 2.0,
    onComplete: () => console.log('Animation done!')
  });
  
  return <div ref={ref}>Animated Content</div>;
}
```

### 🧮 **Mathematical Core**
Built on the healing function **Ĥ(t)**:
```
Ĥ(t) = Σ(k=0 to n-1) A_k(t) × sin(B_k(t) × t + φ_k)
```

Customize coefficients for precise control:
```typescript
import { HealingEngine, HealingCoeffs } from '@ideakz/healing-fx';

const customCoeffs: HealingCoeffs = {
  n: 3,
  A: [t => 1, t => 0.5 * Math.sin(t), t => 0.25],
  B: [t => 4, t => 8, t => 16],
  phi: [0, Math.PI/4, Math.PI/2],
  damping: 0.1,
  timeScale: 1.2
};
```

## 📦 Bundle Sizes

- **Core Engine**: 8KB (gzipped)
- **React Bindings**: 4KB (gzipped)  
- **All Presets**: 6KB (gzipped)
- **Complete Library**: 18KB (gzipped)

## 🎮 Gaming Integration

Perfect for:
- Menu animations
- Health bar effects  
- Button interactions
- Notification popups
- Loading indicators
- Victory celebrations

## 💎 Pro License

Unlock advanced presets and full coefficient control:
- **quake**, **glitch**, **ripple** effects
- Custom coefficient builders
- Priority support
- Commercial usage rights

[Get Pro License →](https://ideakz.com/healing-fx-pro)

## 🛠️ API Reference

### useHealingFx Hook
```typescript
useHealingFx(
  ref: RefObject<HTMLElement>,
  preset: Preset,
  options?: HealingFxOptions
)
```

### Components
- `<HealingButton preset="bounce" />`
- `<HealingPanel preset="float" />`
- `<HealingControls />` (dev mode)

### Core Engine
```typescript
const engine = new HealingEngine(coeffs, updateCallback);
engine.start();
engine.pause();
engine.stop();
```

## 📈 Performance

- **60 FPS** on modern devices
- **Zero dependencies** core
- **Tree-shakeable** modules
- **Memory efficient** animation loops
- **Pause/resume** support

## 🎯 Examples

### Health Bar Animation
```jsx
function HealthBar({ health }) {
  const ref = useRef();
  
  useHealingFx(ref, 'pulse', {
    intensity: health < 20 ? 2 : 0.5,
    speed: health < 20 ? 3 : 1
  });
  
  return (
    <div ref={ref} className="health-bar">
      <div style={{ width: `${health}%` }} />
    </div>
  );
}
```

### Victory Screen
```jsx
function VictoryScreen() {
  return (
    <HealingPanel preset="bounce" healingOptions={{ intensity: 2 }}>
      <h1>VICTORY!</h1>
      <HealingButton preset="glitch">Play Again</HealingButton>
    </HealingPanel>
  );
}
```

## 🧪 Development

```bash
git clone https://github.com/iDeaKz/FX.git
cd FX
npm install
npm run dev        # Start development
npm run build      # Build library
npm run storybook  # Interactive examples
```

## 📜 License

Apache 2.0 - See [LICENSE](LICENSE) for details.

---

**Built by [@iDeaKz](https://github.com/iDeaKz) • Master of 20KB Libraries**