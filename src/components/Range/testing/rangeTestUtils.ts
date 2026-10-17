import { screen } from "@testing-library/react";
import type { Thumb } from "../types";
import { TEST_OUTPUT_LABELS, TEST_THUMB_LABELS, TEST_TRACK_ID } from "./rangeTestConfig";

type TestOutput = keyof typeof TEST_OUTPUT_LABELS;

type ElementBounds = Pick<DOMRect, "left" | "width">;

export const mockElementBounds = (element: Element, bounds: ElementBounds) =>
  jest.spyOn(element, "getBoundingClientRect").mockReturnValue(bounds as DOMRect);

export const mockTrackBounds = (bounds: ElementBounds) =>
  mockElementBounds(screen.getByTestId(TEST_TRACK_ID), bounds);

export const getTestThumb = (thumb: Thumb) =>
  screen.getByRole("button", { name: TEST_THUMB_LABELS[thumb] });

export const readTestOutput = (output: TestOutput) =>
  screen.getByLabelText(TEST_OUTPUT_LABELS[output]).textContent;
