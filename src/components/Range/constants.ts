export const PERCENT_LIMITS = {
  min: 0,
  max: 100,
} as const;

export const KEYBOARD_STEP_MULTIPLIERS: ReadonlyMap<string, number> = new Map([
  ["ArrowLeft", -1],
  ["ArrowDown", -1],
  ["ArrowRight", 1],
  ["ArrowUp", 1],
  ["PageDown", -10],
  ["PageUp", 10],
]);

export const KEYBOARD_BOUNDARY_KEYS = {
  start: "Home",
  end: "End",
} as const;
