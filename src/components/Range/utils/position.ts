import { clamp } from "@/utils/math";
import { PERCENT_LIMITS } from "../constants";

type TrackBounds = Pick<DOMRect, "left" | "width">;

export const clampPercent = (percent: number): number =>
  clamp(percent, PERCENT_LIMITS.min, PERCENT_LIMITS.max);

export const valueToPercent = (value: number, min: number, max: number): number =>
  clampPercent(((value - min) / (max - min)) * PERCENT_LIMITS.max);

export const percentToValue = (percent: number, min: number, max: number): number =>
  min + (percent / PERCENT_LIMITS.max) * (max - min);

export const pointerToPercent = (clientX: number, { left, width }: TrackBounds): number => {
  if (width <= 0) return PERCENT_LIMITS.min;

  return clampPercent(((clientX - left) / width) * PERCENT_LIMITS.max);
};
