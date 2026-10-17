import { useRef } from "react";
import type { KeyboardEvent } from "react";
import type { Interval, Thumb } from "../types";
import { getKeyboardValue } from "../utils/keyboard";
import { percentToValue, valueToPercent } from "../utils/position";
import { useRangeSelection } from "./useRangeSelection";
import { useThumbDrag } from "./useThumbDrag";

interface UseRangeOptions {
  bounds: Interval;
  step: number;
}

export const useRange = ({ bounds, step }: UseRangeOptions) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { selection, setThumbValue } = useRangeSelection({ bounds, step });
  const { draggingThumb, getDragHandlers } = useThumbDrag({
    trackRef,
    onDrag: (thumb, percent) =>
      setThumbValue(thumb, percentToValue(percent, bounds.min, bounds.max)),
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
      setThumbValue(thumb, value);
    },
  });

  return { trackRef, selection, percents, draggingThumb, setThumbValue, getThumbProps };
};
