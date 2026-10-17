import { render, screen } from "@testing-library/react";
import { RANGE_ACCESSIBLE_LABELS } from "../constants";
import { RangeThumb } from "./RangeThumb";

const renderThumb = ({ isDragging = false, isOnTop = false } = {}) => {
  render(
    <RangeThumb
      thumb="min"
      percent={25}
      limits={{ min: 1, max: 80 }}
      value={26}
      valueText="26 €"
      isOnTop={isOnTop}
      isDragging={isDragging}
    />,
  );

  return screen.getByRole("slider", { name: RANGE_ACCESSIBLE_LABELS.thumbs.min });
};

describe("Given a min thumb with the value 26, displayed as 26 €, that can move from 1 to 80", () => {
  describe("When it is rendered", () => {
    it("Then it should be exposed as a slider named after the minimum value", () => {
      expect(renderThumb()).toBeInTheDocument();
    });

    it("Then it should expose its current value and the limits it can move between", () => {
      const thumb = renderThumb();

      expect(thumb).toHaveAttribute("aria-valuenow", "26");
      expect(thumb).toHaveAttribute("aria-valuemin", "1");
      expect(thumb).toHaveAttribute("aria-valuemax", "80");
    });

    it("Then it should expose the formatted value, 26 €, for assistive technologies", () => {
      expect(renderThumb()).toHaveAttribute("aria-valuetext", "26 €");
    });

    it("Then it should be placed at 25% of the track", () => {
      expect(renderThumb()).toHaveStyle({ left: "25%" });
    });

    it("Then it should be reachable with the keyboard", () => {
      expect(renderThumb()).toHaveAttribute("tabindex", "0");
    });
  });

  describe("When it is not being dragged", () => {
    it("Then its cursor should indicate that it can be grabbed", () => {
      expect(renderThumb()).toHaveClass("cursor-grab");
    });

    it("Then it should enlarge when it is hovered", () => {
      expect(renderThumb()).toHaveClass("hover:scale-150");
    });
  });

  describe("When it is being dragged", () => {
    it("Then its cursor should indicate that it is being dragged", () => {
      expect(renderThumb({ isDragging: true })).toHaveClass("cursor-grabbing");
    });

    it("Then it should stay enlarged while it is dragged", () => {
      expect(renderThumb({ isDragging: true })).toHaveClass("scale-150");
    });
  });

  describe("When it is the thumb on top", () => {
    it("Then it should be stacked above the other thumb", () => {
      expect(renderThumb({ isOnTop: true })).toHaveClass("z-20");
    });
  });
});
