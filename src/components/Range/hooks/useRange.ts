import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { DEFAULT_TOP_THUMB } from "../constants";
import type { Interval, Thumb } from "../types";
import { getKeyboardValue } from "../utils/keyboard";
import { percentToValue, valueToPercent } from "../utils/position";
import { resolveDragThumb } from "../utils/selection";
import { useRangeSelection } from "./useRangeSelection";
import { useThumbDrag } from "./useThumbDrag";

interface UseRangeOptions {
  bounds: Interval;
  step: number;
}

export const useRange = ({ bounds, step }: UseRangeOptions) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState<Thumb | null>(null);
  const { selection, setThumbValue } = useRangeSelection({ bounds, step });

  const moveThumb = (thumb: Thumb, value: number) => {
    setActiveThumb(thumb);
    setThumbValue(thumb, value);
  };

  const { draggingThumb, getDragHandlers } = useThumbDrag({
    trackRef,
    onDragStart: setActiveThumb,
    onDrag: (thumb, percent) => {
      const value = percentToValue(percent, bounds.min, bounds.max);

      moveThumb(resolveDragThumb(activeThumb ?? thumb, value, selection), value);
    },
  });

  const percents: Interval = {
    min: valueToPercent(selection.min, bounds.min, bounds.max),
    max: valueToPercent(selection.max, bounds.min, bounds.max),
  };

  const getThumbProps = (thumb: Thumb) => ({
    ...getDragHandlers(thumb),
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      const value = getKeyboardValue(event.key, selection[thumb], step, bounds);

      if (value === null) return;

      event.preventDefault();
      moveThumb(thumb, value);
    },
  });

  return {
    trackRef,
    selection,
    percents,
    draggingThumb,
    topThumb: activeThumb ?? DEFAULT_TOP_THUMB,
    setThumbValue,
    getThumbProps,
  };
};
