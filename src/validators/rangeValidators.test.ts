import { isFixedRangeData, isNormalRangeData } from "./rangeValidators";

describe("Given the isNormalRangeData validator", () => {
  describe("When it receives a min value lower than the max value", () => {
    it("Then it should consider the data a valid normal range", () => {
      expect(isNormalRangeData({ min: 1, max: 100 })).toBe(true);
    });
  });

  describe.each([
    ["null", null],
    ["a number", 42],
    ["an object without max", { min: 1 }],
    ["string values", { min: "1", max: "100" }],
    ["a NaN min value", { min: Number.NaN, max: 100 }],
    ["a min value equal to the max value", { min: 10, max: 10 }],
    ["a min value greater than the max value", { min: 100, max: 1 }],
  ])("When it receives %s", (_, data) => {
    it("Then it should reject the data", () => {
      expect(isNormalRangeData(data)).toBe(false);
    });
  });
});

describe("Given the isFixedRangeData validator", () => {
  describe("When it receives an ascending list of at least two numbers", () => {
    it("Then it should consider the data a valid fixed range", () => {
      expect(isFixedRangeData({ rangeValues: [1.99, 5.99] })).toBe(true);
    });
  });

  describe.each([
    ["null", null],
    ["an object without rangeValues", {}],
    ["rangeValues that are not a list", { rangeValues: "1,2,3" }],
    ["an empty list", { rangeValues: [] }],
    ["a single value", { rangeValues: [1.99] }],
    ["non numeric values", { rangeValues: [1.99, "5.99"] }],
    ["unsorted values", { rangeValues: [5.99, 1.99, 10.99] }],
    ["duplicated values", { rangeValues: [1.99, 1.99, 5.99] }],
  ])("When it receives %s", (_, data) => {
    it("Then it should reject the data", () => {
      expect(isFixedRangeData(data)).toBe(false);
    });
  });
});
