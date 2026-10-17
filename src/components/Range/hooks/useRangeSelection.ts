import { useCallback, useState } from "react";
import { roundToStep } from "@/utils/math";
import type { Interval, Thumb } from "../types";
import { updateSelection } from "../utils/selection";

interface UseRangeSelectionOptions {
  bounds: Interval;
  step: number;
}

export const useRangeSelection = ({ bounds, step }: UseRangeSelectionOptions) => {
  const { min, max } = bounds;
  const [selection, setSelection] = useState<Interval>({ min, max });

  const setThumbValue = useCallback(
    (thumb: Thumb, value: number) => {
      setSelection((current) =>
        updateSelection(current, thumb, roundToStep(value, step, min), { min, max }),
      );
    },
    [min, max, step],
  );

  return { selection, setThumbValue };
};
