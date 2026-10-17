import { RANGE_CONSTRAINTS } from "@/constants/range";
import type { FixedRangeData, NormalRangeData } from "@/types/range";
import { isStrictlyAscending } from "@/utils/array";
import { isFiniteNumber, isRecord } from "@/utils/typeGuards";

export const isNormalRangeData = (data: unknown): data is NormalRangeData =>
  isRecord(data) && isFiniteNumber(data.min) && isFiniteNumber(data.max) && data.min < data.max;

export const isFixedRangeData = (data: unknown): data is FixedRangeData => {
  if (!isRecord(data) || !Array.isArray(data.rangeValues)) return false;

  const values: unknown[] = data.rangeValues;

  return (
    values.length >= RANGE_CONSTRAINTS.minFixedValues &&
    values.every(isFiniteNumber) &&
    isStrictlyAscending(values)
  );
};
