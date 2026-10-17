import { fireEvent, render, screen } from "@testing-library/react";
import type { Interval } from "../types";
import { useRange } from "./useRange";

interface RangeTestTrackProps {
  bounds: Interval;
  step: number;
}

const RangeTestTrack = ({ bounds, step }: RangeTestTrackProps) => {
  const { trackRef, selection, percents, draggingThumb, getThumbProps } = useRange({
    bounds,
    step,
  });

  return (
    <div ref={trackRef} data-testid="track">
      <button aria-label="Minimum value" {...getThumbProps("min")} />
      <button aria-label="Maximum value" {...getThumbProps("max")} />
      <output aria-label="Selection">{`${selection.min}-${selection.max}`}</output>
      <output aria-label="Positions">{`${percents.min}%-${percents.max}%`}</output>
      <output aria-label="Dragging thumb">{draggingThumb ?? "none"}</output>
    </div>
  );
};

const renderRange = (bounds: Interval, step = 1) => {
  render(<RangeTestTrack bounds={bounds} step={step} />);

  jest
    .spyOn(screen.getByTestId("track"), "getBoundingClientRect")
    .mockReturnValue({ left: 0, width: 200 } as DOMRect);

  const minThumb = screen.getByRole("button", { name: "Minimum value" });
  const maxThumb = screen.getByRole("button", { name: "Maximum value" });

  const dragThumb = (thumb: HTMLElement, clientX: number) => {
    fireEvent.pointerDown(thumb, { pointerId: 1 });
    fireEvent.pointerMove(thumb, { pointerId: 1, clientX });
    fireEvent.pointerUp(thumb, { pointerId: 1 });
  };

  return { minThumb, maxThumb, dragThumb };
};

const getSelection = () => screen.getByLabelText("Selection").textContent;
const getPositions = () => screen.getByLabelText("Positions").textContent;
const getDraggingThumb = () => screen.getByLabelText("Dragging thumb").textContent;

describe("Given the useRange hook for a range from 1 to 101 on a track 200px wide", () => {
  const bounds = { min: 1, max: 101 };

  describe("When it is rendered for the first time", () => {
    it("Then the selection should cover the whole range, from 1 to 101", () => {
      renderRange(bounds);

      expect(getSelection()).toBe("1-101");
    });

    it("Then the thumbs should be placed at both ends of the track, 0% and 100%", () => {
      renderRange(bounds);

      expect(getPositions()).toBe("0%-100%");
    });
  });

  describe("When the min thumb is pressed", () => {
    it("Then the min thumb should be reported as the one being dragged", () => {
      const { minThumb } = renderRange(bounds);

      fireEvent.pointerDown(minThumb, { pointerId: 1 });

      expect(getDraggingThumb()).toBe("min");
    });
  });

  describe("When the min thumb is dragged to the middle of the track, 100px", () => {
    it("Then the min value should be the middle of the range, 51", () => {
      const { minThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 100);

      expect(getSelection()).toBe("51-101");
    });

    it("Then the min thumb should be placed at 50% of the track", () => {
      const { minThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 100);

      expect(getPositions()).toBe("50%-100%");
    });
  });

  describe("When the max thumb is dragged to 30px and the min thumb is then dragged to 150px", () => {
    it("Then the min thumb should stop at the max thumb value, 16, without crossing it", () => {
      const { minThumb, maxThumb, dragThumb } = renderRange(bounds);

      dragThumb(maxThumb, 30);
      dragThumb(minThumb, 150);

      expect(getSelection()).toBe("16-16");
    });
  });

  describe("When the ArrowRight key is pressed on the min thumb", () => {
    it("Then the min value should increase one step, to 2", () => {
      const { minThumb } = renderRange(bounds);

      fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(getSelection()).toBe("2-101");
    });

    it("Then the default behaviour of the key should be prevented to avoid scrolling the page", () => {
      const { minThumb } = renderRange(bounds);

      const isNotPrevented = fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(isNotPrevented).toBe(false);
    });
  });

  describe("When the min thumb is dragged to 80px and the Home key is then pressed on the max thumb", () => {
    it("Then the max thumb should stop at the min thumb value, 41", () => {
      const { minThumb, maxThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 80);
      fireEvent.keyDown(maxThumb, { key: "Home" });

      expect(getSelection()).toBe("41-41");
    });
  });

  describe("When the ArrowLeft key is pressed on the min thumb, already at the lower bound", () => {
    it("Then the min value should stay at the lower bound, 1", () => {
      const { minThumb } = renderRange(bounds);

      fireEvent.keyDown(minThumb, { key: "ArrowLeft" });

      expect(getSelection()).toBe("1-101");
    });
  });

  describe("When the Tab key is pressed on a thumb", () => {
    it("Then the selection should not change", () => {
      const { minThumb } = renderRange(bounds);

      fireEvent.keyDown(minThumb, { key: "Tab" });

      expect(getSelection()).toBe("1-101");
    });

    it("Then the default behaviour of the key should be kept so the focus can move", () => {
      const { minThumb } = renderRange(bounds);

      const isNotPrevented = fireEvent.keyDown(minThumb, { key: "Tab" });

      expect(isNotPrevented).toBe(true);
    });
  });
});

describe("Given the useRange hook for a fixed range of six values handled by their indexes, from 0 to 5", () => {
  const bounds = { min: 0, max: 5 };

  describe("When the min thumb is dragged to 90px, between the second and the third value", () => {
    it("Then the min thumb should snap to the closest index, 2", () => {
      const { minThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 90);

      expect(getSelection()).toBe("2-5");
    });

    it("Then the min thumb should be placed exactly on the third value, at 40% of the track", () => {
      const { minThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 90);

      expect(getPositions()).toBe("40%-100%");
    });
  });

  describe("When the ArrowLeft key is pressed on the max thumb", () => {
    it("Then the max thumb should move to the previous index, 4", () => {
      const { maxThumb } = renderRange(bounds);

      fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });

      expect(getSelection()).toBe("0-4");
    });
  });
});
