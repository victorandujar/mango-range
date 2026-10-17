import type { FormatValue, Interval, RangeModel, Thumb, ThumbView } from "../types";
import { getThumbLimits } from "./selection";

export const getThumbView = (
  thumb: Thumb,
  selection: Interval,
  { bounds, toValue }: Pick<RangeModel, "bounds" | "toValue">,
  formatValue: FormatValue,
): ThumbView => {
  const value = toValue(selection[thumb]);
  const limits = getThumbLimits(thumb, selection, bounds);

  return {
    value,
    text: formatValue(value),
    limits: { min: toValue(limits.min), max: toValue(limits.max) },
  };
};
