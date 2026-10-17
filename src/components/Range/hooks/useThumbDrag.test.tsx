import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import {
  NO_DRAGGING_THUMB,
  TEST_OUTPUT_LABELS,
  TEST_THUMB_LABELS,
  TEST_THUMBS,
  TEST_TRACK_ID,
} from "../testing/rangeTestConfig";
import { getTestThumb, mockTrackBounds, readTestOutput } from "../testing/rangeTestUtils";
import type { Thumb } from "../types";
import { useThumbDrag } from "./useThumbDrag";

interface DragTestTrackProps {
  onDrag: (thumb: Thumb, percent: number) => void;
}

const DragTestTrack = ({ onDrag }: DragTestTrackProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { draggingThumb, getDragHandlers } = useThumbDrag({ trackRef, onDrag });

  return (
    <div ref={trackRef} data-testid={TEST_TRACK_ID}>
      {TEST_THUMBS.map((thumb) => (
        <button key={thumb} aria-label={TEST_THUMB_LABELS[thumb]} {...getDragHandlers(thumb)} />
      ))}
      <output aria-label={TEST_OUTPUT_LABELS.draggingThumb}>
        {draggingThumb ?? NO_DRAGGING_THUMB}
      </output>
    </div>
  );
};

const renderTrack = () => {
  const onDrag = jest.fn();

  render(<DragTestTrack onDrag={onDrag} />);
  mockTrackBounds({ left: 100, width: 200 });

  return {
    onDrag,
    minThumb: getTestThumb("min"),
    maxThumb: getTestThumb("max"),
    draggingThumb: () => readTestOutput("draggingThumb"),
  };
};

describe("Given a track 200px wide, starting at 100px, with a min and a max thumb", () => {
  describe("When the min thumb is pressed with the primary pointer button", () => {
    it("Then the min thumb should be the one being dragged", () => {
      const { minThumb, draggingThumb } = renderTrack();

      fireEvent.pointerDown(minThumb, { pointerId: 1 });

      expect(draggingThumb()).toBe("min");
    });

    it("Then the min thumb should receive the focus", () => {
      const { minThumb } = renderTrack();

      fireEvent.pointerDown(minThumb, { pointerId: 1 });

      expect(minThumb).toHaveFocus();
    });

    it("Then the min thumb should capture the pointer to keep receiving its moves", () => {
      const { minThumb } = renderTrack();
      const setPointerCapture = jest.spyOn(minThumb, "setPointerCapture");

      fireEvent.pointerDown(minThumb, { pointerId: 7 });

      expect(setPointerCapture).toHaveBeenCalledWith(7);
    });
  });

  describe("When the min thumb is pressed and the pointer moves to 150px", () => {
    it("Then it should report a drag of the min thumb to 25% of the track", () => {
      const { minThumb, onDrag } = renderTrack();

      fireEvent.pointerDown(minThumb, { pointerId: 1 });
      fireEvent.pointerMove(minThumb, { pointerId: 1, clientX: 150 });

      expect(onDrag).toHaveBeenCalledWith("min", 25);
    });
  });

  describe("When the max thumb is pressed and the pointer moves beyond the end of the track, to 900px", () => {
    it("Then it should report a drag of the max thumb to the end of the track, 100%", () => {
      const { maxThumb, onDrag } = renderTrack();

      fireEvent.pointerDown(maxThumb, { pointerId: 1 });
      fireEvent.pointerMove(maxThumb, { pointerId: 1, clientX: 900 });

      expect(onDrag).toHaveBeenCalledWith("max", 100);
    });
  });

  describe("When the pointer moves over a thumb that has not been pressed", () => {
    it("Then it should not report any drag", () => {
      const { minThumb, onDrag } = renderTrack();

      fireEvent.pointerMove(minThumb, { pointerId: 1, clientX: 150 });

      expect(onDrag).not.toHaveBeenCalled();
    });
  });

  describe("When the min thumb is being dragged and the pointer moves over the max thumb", () => {
    it("Then it should not report a drag of the max thumb", () => {
      const { minThumb, maxThumb, onDrag } = renderTrack();

      fireEvent.pointerDown(minThumb, { pointerId: 1 });
      fireEvent.pointerMove(maxThumb, { pointerId: 1, clientX: 150 });

      expect(onDrag).not.toHaveBeenCalled();
    });
  });

  describe.each([
    ["released", fireEvent.pointerUp],
    ["cancelled by the browser", fireEvent.pointerCancel],
  ])("When the min thumb is dragged and the pointer is %s", (_, endPointer) => {
    it("Then no thumb should be dragged anymore", () => {
      const { minThumb, draggingThumb } = renderTrack();

      fireEvent.pointerDown(minThumb, { pointerId: 1 });
      endPointer(minThumb, { pointerId: 1 });

      expect(draggingThumb()).toBe(NO_DRAGGING_THUMB);
    });

    it("Then further pointer moves should not report any drag", () => {
      const { minThumb, onDrag } = renderTrack();

      fireEvent.pointerDown(minThumb, { pointerId: 1 });
      endPointer(minThumb, { pointerId: 1 });
      fireEvent.pointerMove(minThumb, { pointerId: 1, clientX: 150 });

      expect(onDrag).not.toHaveBeenCalled();
    });
  });

  describe("When the min thumb is pressed with the secondary pointer button", () => {
    it("Then no thumb should be dragged", () => {
      const { minThumb, draggingThumb } = renderTrack();

      fireEvent.pointerDown(minThumb, { pointerId: 1, button: 2 });

      expect(draggingThumb()).toBe(NO_DRAGGING_THUMB);
    });
  });
});
