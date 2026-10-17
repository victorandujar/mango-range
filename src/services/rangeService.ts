import type { FixedRangeData, NormalRangeData } from "@/types/range";

export const rangeEndpoints = {
  normal: "/api/range/normal",
  fixed: "/api/range/fixed",
} as const;

const isRecord = (data: unknown): data is Record<string, unknown> =>
  typeof data === "object" && data !== null;

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

export const isNormalRangeData = (data: unknown): data is NormalRangeData =>
  isRecord(data) && isFiniteNumber(data.min) && isFiniteNumber(data.max) && data.min < data.max;

const isStrictlyAscending = (values: number[]) =>
  values.every((value, index) => index === 0 || value > (values[index - 1] ?? -Infinity));

export const isFixedRangeData = (data: unknown): data is FixedRangeData => {
  if (!isRecord(data) || !Array.isArray(data.rangeValues)) return false;

  const values: unknown[] = data.rangeValues;

  return values.length >= 2 && values.every(isFiniteNumber) && isStrictlyAscending(values);
};

const fetchRangeData = async <T>(
  url: string,
  isValid: (data: unknown) => data is T,
  signal?: AbortSignal,
): Promise<T> => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isValid(data)) {
    throw new Error(`Unexpected response format from ${url}`);
  }

  return data;
};

export const getNormalRange = (signal?: AbortSignal) =>
  fetchRangeData(rangeEndpoints.normal, isNormalRangeData, signal);

export const getFixedRange = (signal?: AbortSignal) =>
  fetchRangeData(rangeEndpoints.fixed, isFixedRangeData, signal);
