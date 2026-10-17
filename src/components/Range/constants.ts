export const THUMBS = {
  min: "min",
  max: "max",
} as const;

export const DEFAULT_TOP_THUMB = THUMBS.max;

export const PERCENT_LIMITS = {
  min: 0,
  max: 100,
} as const;

export const EMPTY_TRACK_WIDTH = 0;

export const PRIMARY_POINTER_BUTTON = 0;

export const KEYBOARD_STEPS = {
  single: 1,
  page: 10,
} as const;

export const KEYBOARD_STEP_MULTIPLIERS: ReadonlyMap<string, number> = new Map([
  ["ArrowLeft", -KEYBOARD_STEPS.single],
  ["ArrowDown", -KEYBOARD_STEPS.single],
  ["ArrowRight", KEYBOARD_STEPS.single],
  ["ArrowUp", KEYBOARD_STEPS.single],
  ["PageDown", -KEYBOARD_STEPS.page],
  ["PageUp", KEYBOARD_STEPS.page],
]);

export const KEYBOARD_BOUNDARY_KEYS = {
  start: "Home",
  end: "End",
} as const;
