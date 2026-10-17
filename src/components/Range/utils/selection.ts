import { clamp } from "@/utils/math";
import type { Interval, Thumb } from "../types";

export const getThumbLimits = (thumb: Thumb, selection: Interval, bounds: Interval): Interval =>
  thumb === "min"
    ? { min: bounds.min, max: selection.max }
    : { min: selection.min, max: bounds.max };

export const constrainThumbValue = (
  thumb: Thumb,
  value: number,
  selection: Interval,
  bounds: Interval,
): number => {
  const limits = getThumbLimits(thumb, selection, bounds);

  return clamp(value, limits.min, limits.max);
};

export const updateSelection = (
  selection: Interval,
  thumb: Thumb,
  value: number,
  bounds: Interval,
): Interval => ({
  ...selection,
  [thumb]: constrainThumbValue(thumb, value, selection, bounds),
});

export const resolveDragThumb = (thumb: Thumb, value: number, selection: Interval): Thumb => {
  if (selection.min !== selection.max) return thumb;
  if (value < selection.min) return "min";
  if (value > selection.max) return "max";

  return thumb;
};
