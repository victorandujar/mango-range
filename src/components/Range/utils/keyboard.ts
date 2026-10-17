import { KEYBOARD_BOUNDARY_KEYS, KEYBOARD_STEP_MULTIPLIERS } from "../constants";
import type { Interval } from "../types";

export const getKeyboardValue = (
  key: string,
  value: number,
  step: number,
  bounds: Interval,
): number | null => {
  if (key === KEYBOARD_BOUNDARY_KEYS.start) return bounds.min;
  if (key === KEYBOARD_BOUNDARY_KEYS.end) return bounds.max;

  const multiplier = KEYBOARD_STEP_MULTIPLIERS.get(key);

  return multiplier === undefined ? null : value + multiplier * step;
};
