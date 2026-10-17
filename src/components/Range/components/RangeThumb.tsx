import type { HTMLAttributes } from "react";
import { classNames } from "@/utils/classNames";
import { RANGE_ACCESSIBLE_LABELS } from "../constants";
import type { Interval, Thumb } from "../types";
import { toCssPercent } from "../utils/position";

interface RangeThumbProps extends HTMLAttributes<HTMLDivElement> {
  thumb: Thumb;
  percent: number;
  limits: Interval;
  value: number;
  valueText: string;
  isOnTop: boolean;
  isDragging: boolean;
}

export const RangeThumb = ({
  thumb,
  percent,
  limits,
  value,
  valueText,
  isOnTop,
  isDragging,
  ...handlers
}: RangeThumbProps) => (
  <div
    role="slider"
    tabIndex={0}
    aria-label={RANGE_ACCESSIBLE_LABELS.thumbs[thumb]}
    aria-valuemin={limits.min}
    aria-valuemax={limits.max}
    aria-valuenow={value}
    aria-valuetext={valueText}
    className={classNames(
      "absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 touch-none rounded-full bg-neutral-900",
      "transition-transform duration-150 hover:scale-150",
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900",
      isDragging ? "scale-150 cursor-grabbing" : "cursor-grab",
      isOnTop ? "z-20" : "z-10",
    )}
    style={{ left: toCssPercent(percent) }}
    {...handlers}
  />
);
