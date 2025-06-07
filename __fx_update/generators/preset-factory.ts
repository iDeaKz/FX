// Micro-service generator pattern - Your specialty
type PresetParams = { intensity: number; chaos: number; damping: number };
export const generatePreset = (params: PresetParams): HealingCoeffs => ({
  n: Math.min(8, Math.ceil(params.intensity * 4)),
  A: Array.from({ length: 8 }, (_, i) => (t: number) => 
    params.intensity * Math.exp(-params.damping * t) * (1 - i * 0.1)),
  B: Array.from({ length: 8 }, (_, i) => (t: number) => 
    (i + 1) * 2 + params.chaos * Math.sin(t * (i + 1))),
  phi: Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 8),
  damping: params.damping,
  timeScale: 1 + params.intensity * 0.5
});