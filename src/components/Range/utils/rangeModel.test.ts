import { RANGE_ERROR_MESSAGES } from "../constants";
import { getFixedValue, getRangeModel, isFixedRangeProps } from "./rangeModel";

const fixedValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

describe("Given the isFixedRangeProps type guard", () => {
  describe("When it receives props with a list of values", () => {
    it("Then it should identify them as fixed range props", () => {
      expect(isFixedRangeProps({ values: fixedValues })).toBe(true);
    });
  });

  describe("When it receives props with a min and a max", () => {
    it("Then it should not identify them as fixed range props", () => {
      expect(isFixedRangeProps({ min: 1, max: 100 })).toBe(false);
    });
  });
});

describe("Given the getFixedValue helper with six fixed values", () => {
  describe("When it receives the index 2", () => {
    it("Then it should return the third value, 10.99", () => {
      expect(getFixedValue(fixedValues, 2)).toBe(10.99);
    });
  });

  describe("When it receives an index outside the list, 6", () => {
    it("Then it should throw a range error explaining the position does not match any value", () => {
      expect(() => getFixedValue(fixedValues, 6)).toThrow(RANGE_ERROR_MESSAGES.positionOutOfValues);
    });
  });
});

describe("Given the getRangeModel builder with normal range props from 1 to 100", () => {
  describe("When no step is provided", () => {
    it("Then the model should use the range limits and a step of 1", () => {
      const { bounds, step } = getRangeModel({ min: 1, max: 100 });

      expect(bounds).toEqual({ min: 1, max: 100 });
      expect(step).toBe(1);
    });
  });

  describe("When a step of 5 is provided", () => {
    it("Then the model should use a step of 5", () => {
      expect(getRangeModel({ min: 1, max: 100, step: 5 }).step).toBe(5);
    });
  });

  describe("When a position is converted into a value", () => {
    it("Then the value should be the position itself, as normal ranges work with real values", () => {
      expect(getRangeModel({ min: 1, max: 100 }).toValue(42)).toBe(42);
    });
  });

  describe("When the model is checked for editable labels", () => {
    it("Then its labels should be editable", () => {
      expect(getRangeModel({ min: 1, max: 100 }).isEditable).toBe(true);
    });
  });
});

describe("Given the getRangeModel builder with six fixed values", () => {
  const model = getRangeModel({ values: fixedValues });

  describe("When its bounds and step are read", () => {
    it("Then they should cover the indexes of the values, from 0 to 5, one by one", () => {
      expect(model.bounds).toEqual({ min: 0, max: 5 });
      expect(model.step).toBe(1);
    });
  });

  describe.each([
    [0, 1.99],
    [3, 30.99],
    [5, 70.99],
  ])("When the position %p is converted into a value", (position, expected) => {
    it(`Then it should return the fixed value at that index, ${expected}`, () => {
      expect(model.toValue(position)).toBe(expected);
    });
  });

  describe("When the model is checked for editable labels", () => {
    it("Then its labels should not be editable, as fixed values are only labels", () => {
      expect(model.isEditable).toBe(false);
    });
  });
});
