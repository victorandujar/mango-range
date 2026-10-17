import { FIRST_INDEX } from "@/constants/array";
import { getLastIndex } from "@/utils/array";
import { DEFAULT_STEP, FIXED_RANGE_STEP, RANGE_ERROR_MESSAGES } from "../constants";
import type { FixedRangeProps, RangeModel, RangeProps } from "../types";

export const isFixedRangeProps = (props: RangeProps): props is FixedRangeProps =>
  props.values !== undefined;

export const getFixedValue = (values: readonly number[], index: number): number => {
  const value = values[index];

  if (value === undefined) {
    throw new RangeError(RANGE_ERROR_MESSAGES.positionOutOfValues);
  }

  return value;
};

export const getRangeModel = (props: RangeProps): RangeModel => {
  if (isFixedRangeProps(props)) {
    return {
      bounds: { min: FIRST_INDEX, max: getLastIndex(props.values) },
      step: FIXED_RANGE_STEP,
      toValue: (index) => getFixedValue(props.values, index),
      isEditable: false,
    };
  }

  return {
    bounds: { min: props.min, max: props.max },
    step: props.step ?? DEFAULT_STEP,
    toValue: (value) => value,
    isEditable: true,
  };
};
