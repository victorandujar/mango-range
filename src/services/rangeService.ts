import "server-only";
import { fixedRangeMock, normalRangeMock } from "@/mocks/range";
import type { FixedRangeData, NormalRangeData } from "@/types/range";
import { isFixedRangeData, isNormalRangeData } from "@/validators/rangeValidators";

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
