import { classNames } from "@/utils/classNames";
import { LABEL_ALIGNMENT_CLASSES } from "../constants";
import type { Thumb } from "../types";

interface RangeLabelProps {
  thumb: Thumb;
  text: string;
}

export const RangeLabel = ({ thumb, text }: RangeLabelProps) => (
  <span className={classNames("min-w-16 text-sm tabular-nums", LABEL_ALIGNMENT_CLASSES[thumb])}>
    {text}
  </span>
);
