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
