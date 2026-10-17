import type { Thumb } from "../types";

export const TEST_TRACK_ID = "track";

export const TEST_THUMBS: readonly Thumb[] = ["min", "max"];

export const TEST_THUMB_LABELS: Readonly<Record<Thumb, string>> = {
  min: "Minimum value",
  max: "Maximum value",
};

export const TEST_OUTPUT_LABELS = {
  selection: "Selection",
  positions: "Positions",
  draggingThumb: "Dragging thumb",
  topThumb: "Top thumb",
} as const;

export const NO_DRAGGING_THUMB = "none";

export const TEST_EDIT_LABELS = {
  button: "Edit value",
  input: "Value",
} as const;

export const TEST_FIXED_VALUES = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

export const TEST_EURO_FORMAT = {
  locale: "en-US",
  options: { style: "currency", currency: "EUR", minimumFractionDigits: 0 },
} as const;
