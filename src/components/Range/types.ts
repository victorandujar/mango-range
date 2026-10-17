export interface Interval {
  min: number;
  max: number;
}

export type Thumb = keyof Interval;

export type FormatValue = (value: number) => string;

interface BaseRangeProps {
  formatValue?: FormatValue;
}

export interface NormalRangeProps extends BaseRangeProps {
  min: number;
  max: number;
  step?: number;
  values?: never;
}

export interface FixedRangeProps extends BaseRangeProps {
  values: number[];
  min?: never;
  max?: never;
  step?: never;
}

export type RangeProps = NormalRangeProps | FixedRangeProps;

export interface RangeModel {
  bounds: Interval;
  step: number;
  toValue: (position: number) => number;
  isEditable: boolean;
}
