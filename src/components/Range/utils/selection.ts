import { clamp } from "@/utils/math";
import type { Interval, Thumb } from "../types";

export const constrainThumbValue = (
  thumb: Thumb,
  value: number,
  selection: Interval,
  bounds: Interval,
): number =>
  thumb === "min"
    ? clamp(value, bounds.min, selection.max)
    : clamp(value, selection.min, bounds.max);

export const updateSelection = (
  selection: Interval,
  thumb: Thumb,
  value: number,
  bounds: Interval,
): Interval => ({
  ...selection,
  [thumb]: constrainThumbValue(thumb, value, selection, bounds),
});
