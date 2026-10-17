import { screen } from "@testing-library/react";
import type { Thumb } from "../types";
import { TEST_OUTPUT_LABELS, TEST_THUMB_LABELS, TEST_TRACK_ID } from "./rangeTestConfig";

type TestOutput = keyof typeof TEST_OUTPUT_LABELS;

export const mockTrackBounds = (bounds: Pick<DOMRect, "left" | "width">) =>
  jest
    .spyOn(screen.getByTestId(TEST_TRACK_ID), "getBoundingClientRect")
    .mockReturnValue(bounds as DOMRect);

export const getTestThumb = (thumb: Thumb) =>
  screen.getByRole("button", { name: TEST_THUMB_LABELS[thumb] });

export const readTestOutput = (output: TestOutput) =>
  screen.getByLabelText(TEST_OUTPUT_LABELS[output]).textContent;
