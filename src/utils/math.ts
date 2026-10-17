export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const roundToStep = (value: number, step: number, origin = 0): number =>
  origin + Math.round((value - origin) / step) * step;
