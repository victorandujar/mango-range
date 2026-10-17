import "server-only";
import { ERROR_MESSAGES } from "@/constants/messages";
import { fixedRangeMock, normalRangeMock } from "@/mocks/range";
import type { FixedRangeData, NormalRangeData } from "@/types/range";
import { ensureValid } from "@/utils/ensureValid";
import { isFixedRangeData, isNormalRangeData } from "@/validators/rangeValidators";

export const getNormalRange = async (): Promise<NormalRangeData> =>
  ensureValid(normalRangeMock, isNormalRangeData, ERROR_MESSAGES.invalidNormalRange);

export const getFixedRange = async (): Promise<FixedRangeData> =>
  ensureValid(fixedRangeMock, isFixedRangeData, ERROR_MESSAGES.invalidFixedRange);
