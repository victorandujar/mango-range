import { fireEvent, render } from "@testing-library/react";
import {
  NO_DRAGGING_THUMB,
  TEST_OUTPUT_LABELS,
  TEST_THUMB_LABELS,
  TEST_THUMBS,
  TEST_TRACK_ID,
} from "../testing/rangeTestConfig";
import { getTestThumb, mockTrackBounds, readTestOutput } from "../testing/rangeTestUtils";
import type { Interval } from "../types";
import { useRange } from "./useRange";

interface RangeTestTrackProps {
  bounds: Interval;
  step: number;
}

const RangeTestTrack = ({ bounds, step }: RangeTestTrackProps) => {
  const { trackRef, selection, percents, draggingThumb, topThumb, getThumbProps } = useRange({
    bounds,
    step,
  });

  const outputs = [
    { label: TEST_OUTPUT_LABELS.selection, value: `${selection.min}-${selection.max}` },
    { label: TEST_OUTPUT_LABELS.positions, value: `${percents.min}%-${percents.max}%` },
    { label: TEST_OUTPUT_LABELS.draggingThumb, value: draggingThumb ?? NO_DRAGGING_THUMB },
    { label: TEST_OUTPUT_LABELS.topThumb, value: topThumb },
  ];

  return (
    <div ref={trackRef} data-testid={TEST_TRACK_ID}>
      {TEST_THUMBS.map((thumb) => (
        <button key={thumb} aria-label={TEST_THUMB_LABELS[thumb]} {...getThumbProps(thumb)} />
      ))}
      {outputs.map(({ label, value }) => (
        <output key={label} aria-label={label}>
          {value}
        </output>
      ))}
    </div>
  );
};

const dragThumb = (thumb: HTMLElement, clientX: number) => {
  fireEvent.pointerDown(thumb, { pointerId: 1 });
  fireEvent.pointerMove(thumb, { pointerId: 1, clientX });
  fireEvent.pointerUp(thumb, { pointerId: 1 });
};

const renderRange = (bounds: Interval, step = 1) => {
  render(<RangeTestTrack bounds={bounds} step={step} />);
  mockTrackBounds({ left: 0, width: 200 });

  return { minThumb: getTestThumb("min"), maxThumb: getTestThumb("max"), dragThumb };
};

const getSelection = () => readTestOutput("selection");
const getPositions = () => readTestOutput("positions");
const getDraggingThumb = () => readTestOutput("draggingThumb");
const getTopThumb = () => readTestOutput("topThumb");

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

describe("Given the useRange hook for a range from 1 to 101 where the thumbs overlap", () => {
  const bounds = { min: 1, max: 101 };

  describe("When it is rendered for the first time", () => {
    it("Then the max thumb should be on top", () => {
      renderRange(bounds);

      expect(getTopThumb()).toBe("max");
    });
  });

  describe("When the min thumb is dragged to the end of the track, over the max thumb", () => {
    it("Then the min thumb should be on top, so it can still be dragged back", () => {
      const { minThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 200);

      expect(getSelection()).toBe("101-101");
      expect(getTopThumb()).toBe("min");
    });
  });

  describe("When a key moves the min thumb", () => {
    it("Then the min thumb should be on top", () => {
      const { minThumb } = renderRange(bounds);

      fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(getTopThumb()).toBe("min");
    });
  });

  describe("When both thumbs are collapsed at 51 and the max thumb is dragged backward, to 20px and then to 40px", () => {
    it("Then the min thumb should move with the pointer during the whole drag, ending at 21", () => {
      const { minThumb, maxThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 100);
      dragThumb(maxThumb, 100);
      fireEvent.pointerDown(maxThumb, { pointerId: 1 });
      fireEvent.pointerMove(maxThumb, { pointerId: 1, clientX: 20 });
      fireEvent.pointerMove(maxThumb, { pointerId: 1, clientX: 40 });

      expect(getSelection()).toBe("21-51");
    });

    it("Then the min thumb should be on top", () => {
      const { minThumb, maxThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 100);
      dragThumb(maxThumb, 100);
      dragThumb(maxThumb, 20);

      expect(getTopThumb()).toBe("min");
    });
  });

  describe("When the max thumb is dragged against the min thumb at 51 and the pointer keeps moving backward in the same drag", () => {
    it("Then the max thumb should stop at the min thumb and the min thumb should not move", () => {
      const { minThumb, maxThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 100);
      fireEvent.pointerDown(maxThumb, { pointerId: 1 });
      fireEvent.pointerMove(maxThumb, { pointerId: 1, clientX: 100 });
      fireEvent.pointerMove(maxThumb, { pointerId: 1, clientX: 40 });
      fireEvent.pointerMove(maxThumb, { pointerId: 1, clientX: 10 });

      expect(getSelection()).toBe("51-51");
    });
  });

  describe("When both thumbs are collapsed at 51 and the min thumb is dragged forward, to 160px", () => {
    it("Then the max thumb should move with the pointer, ending at 81", () => {
      const { minThumb, maxThumb, dragThumb } = renderRange(bounds);

      dragThumb(minThumb, 100);
      dragThumb(maxThumb, 100);
      dragThumb(minThumb, 160);

      expect(getSelection()).toBe("51-81");
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
