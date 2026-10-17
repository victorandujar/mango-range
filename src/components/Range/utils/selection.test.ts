import { constrainThumbValue, updateSelection } from "./selection";

const bounds = { min: 1, max: 100 };
const selection = { min: 20, max: 80 };

describe("Given a range from 1 to 100 with a selection from 20 to 80", () => {
  describe("When the min thumb is moved to 50, between the lower bound and the max thumb", () => {
    it("Then the min thumb should take the value 50", () => {
      expect(constrainThumbValue("min", 50, selection, bounds)).toBe(50);
    });
  });

  describe("When the min thumb is moved below the lower bound, to -10", () => {
    it("Then the min thumb should stop at the lower bound, 1", () => {
      expect(constrainThumbValue("min", -10, selection, bounds)).toBe(1);
    });
  });

  describe("When the min thumb is moved past the max thumb, to 95", () => {
    it("Then the min thumb should stop at the max thumb value, 80, without crossing it", () => {
      expect(constrainThumbValue("min", 95, selection, bounds)).toBe(80);
    });
  });

  describe("When the max thumb is moved to 60, between the min thumb and the upper bound", () => {
    it("Then the max thumb should take the value 60", () => {
      expect(constrainThumbValue("max", 60, selection, bounds)).toBe(60);
    });
  });

  describe("When the max thumb is moved above the upper bound, to 250", () => {
    it("Then the max thumb should stop at the upper bound, 100", () => {
      expect(constrainThumbValue("max", 250, selection, bounds)).toBe(100);
    });
  });

  describe("When the max thumb is moved past the min thumb, to 5", () => {
    it("Then the max thumb should stop at the min thumb value, 20, without crossing it", () => {
      expect(constrainThumbValue("max", 5, selection, bounds)).toBe(20);
    });
  });

  describe("When the selection is updated by moving the min thumb to 30", () => {
    it("Then it should return a new selection from 30 to 80", () => {
      expect(updateSelection(selection, "min", 30, bounds)).toEqual({ min: 30, max: 80 });
    });

    it("Then it should keep the original selection untouched", () => {
      updateSelection(selection, "min", 30, bounds);

      expect(selection).toEqual({ min: 20, max: 80 });
    });
  });

  describe("When the selection is updated by moving the max thumb past the min thumb", () => {
    it("Then it should return a selection where both thumbs share the min value, 20", () => {
      expect(updateSelection(selection, "max", 10, bounds)).toEqual({ min: 20, max: 20 });
    });
  });
});
