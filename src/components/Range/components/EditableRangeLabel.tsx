import { classNames } from "@/utils/classNames";
import { LABEL_ALIGNMENT_CLASSES, RANGE_ACCESSIBLE_LABELS } from "../constants";
import { useEditableValue } from "../hooks/useEditableValue";
import type { Interval, Thumb } from "../types";

interface EditableRangeLabelProps {
  thumb: Thumb;
  value: number;
  text: string;
  limits: Interval;
  step: number;
  onCommit: (value: number) => void;
}

export const EditableRangeLabel = ({
  thumb,
  value,
  text,
  limits,
  step,
  onCommit,
}: EditableRangeLabelProps) => {
  const { isEditing, startEditing, inputProps } = useEditableValue({ value, onCommit });
  const alignmentClass = LABEL_ALIGNMENT_CLASSES[thumb];

  if (isEditing) {
    return (
      <input
        type="number"
        autoFocus
        min={limits.min}
        max={limits.max}
        step={step}
        aria-label={RANGE_ACCESSIBLE_LABELS.inputs[thumb]}
        className={classNames(
          "w-16 rounded border border-neutral-400 px-1 text-sm tabular-nums",
          alignmentClass,
        )}
        {...inputProps}
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={RANGE_ACCESSIBLE_LABELS.editButtons[thumb]}
      className={classNames(
        "min-w-16 cursor-text text-sm tabular-nums underline-offset-4 hover:underline",
        alignmentClass,
      )}
      onClick={startEditing}
    >
      {text}
    </button>
  );
};
