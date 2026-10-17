import { act, renderHook } from "@testing-library/react";
import { useRangeSelection } from "./useRangeSelection";

const renderSelection = (step = 1) =>
  renderHook(() => useRangeSelection({ bounds: { min: 1, max: 100 }, step }));

describe("Given the useRangeSelection hook for a range from 1 to 100 with a step of 1", () => {
  describe("When it is rendered for the first time", () => {
    it("Then the selection should cover the whole range, from 1 to 100", () => {
      const { result } = renderSelection();

      expect(result.current.selection).toEqual({ min: 1, max: 100 });
    });
  });

  describe("When the min thumb is set to 30", () => {
    it("Then the selection should go from 30 to 100", () => {
      const { result } = renderSelection();

      act(() => result.current.setThumbValue("min", 30));

      expect(result.current.selection).toEqual({ min: 30, max: 100 });
    });
  });

  describe("When the max thumb is set to 42.6, a value between two steps", () => {
    it("Then the max thumb should snap to the closest step, 43", () => {
      const { result } = renderSelection();

      act(() => result.current.setThumbValue("max", 42.6));

      expect(result.current.selection).toEqual({ min: 1, max: 43 });
    });
  });

  describe("When the min thumb is set below the lower bound, to -20", () => {
    it("Then the min thumb should stay at the lower bound, 1", () => {
      const { result } = renderSelection();

      act(() => result.current.setThumbValue("min", -20));

      expect(result.current.selection.min).toBe(1);
    });
  });

  describe("When the max thumb is set to 40 and then the min thumb is set to 70", () => {
    it("Then the min thumb should stop at the max thumb value, 40, without crossing it", () => {
      const { result } = renderSelection();

      act(() => result.current.setThumbValue("max", 40));
      act(() => result.current.setThumbValue("min", 70));

      expect(result.current.selection).toEqual({ min: 40, max: 40 });
    });
  });

  describe("When both thumbs are updated within the same interaction", () => {
    it("Then each update should be applied over the previous one", () => {
      const { result } = renderSelection();

      act(() => {
        result.current.setThumbValue("min", 25);
        result.current.setThumbValue("max", 75);
      });

      expect(result.current.selection).toEqual({ min: 25, max: 75 });
    });
  });
});

describe("Given the useRangeSelection hook for a range from 1 to 100 with a step of 5", () => {
  describe("When the max thumb is set to 23", () => {
    it("Then the max thumb should snap to the closest step counted from the lower bound, 21", () => {
      const { result } = renderSelection(5);

      act(() => result.current.setThumbValue("max", 23));

      expect(result.current.selection.max).toBe(21);
    });
  });
});
