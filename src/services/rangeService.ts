import "server-only";
import { fixedRangeMock, normalRangeMock } from "@/mocks/range";
import type { FixedRangeData, NormalRangeData } from "@/types/range";

const isRecord = (data: unknown): data is Record<string, unknown> =>
  typeof data === "object" && data !== null;

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isStrictlyAscending = (values: number[]) =>
  values.every((value, index) => index === 0 || value > (values[index - 1] ?? -Infinity));

export const isNormalRangeData = (data: unknown): data is NormalRangeData =>
  isRecord(data) && isFiniteNumber(data.min) && isFiniteNumber(data.max) && data.min < data.max;

export const isFixedRangeData = (data: unknown): data is FixedRangeData => {
  if (!isRecord(data) || !Array.isArray(data.rangeValues)) return false;

  const values: unknown[] = data.rangeValues;

  return values.length >= 2 && values.every(isFiniteNumber) && isStrictlyAscending(values);
};

export const getNormalRange = async (): Promise<NormalRangeData> => {
  if (!isNormalRangeData(normalRangeMock)) {
    throw new Error("Invalid normal range data");
  }

  return normalRangeMock;
};

export const getFixedRange = async (): Promise<FixedRangeData> => {
  if (!isFixedRangeData(fixedRangeMock)) {
    throw new Error("Invalid fixed range data");
  }

  return fixedRangeMock;
};
