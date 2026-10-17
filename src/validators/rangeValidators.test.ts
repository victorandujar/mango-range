import { isFixedRangeData, isNormalRangeData } from "./rangeValidators";

describe("isNormalRangeData", () => {
  it("accepts an object with a min lower than max", () => {
    expect(isNormalRangeData({ min: 1, max: 100 })).toBe(true);
  });

  it.each([
    ["null", null],
    ["a number", 42],
    ["missing max", { min: 1 }],
    ["string values", { min: "1", max: "100" }],
    ["NaN values", { min: Number.NaN, max: 100 }],
    ["min equal to max", { min: 10, max: 10 }],
    ["min greater than max", { min: 100, max: 1 }],
  ])("rejects %s", (_, data) => {
    expect(isNormalRangeData(data)).toBe(false);
  });
});

describe("isFixedRangeData", () => {
  it("accepts an ascending list of at least two numbers", () => {
    expect(isFixedRangeData({ rangeValues: [1.99, 5.99] })).toBe(true);
  });

  it.each([
    ["null", null],
    ["missing rangeValues", {}],
    ["a non array value", { rangeValues: "1,2,3" }],
    ["an empty list", { rangeValues: [] }],
    ["a single value", { rangeValues: [1.99] }],
    ["non numeric items", { rangeValues: [1.99, "5.99"] }],
    ["unsorted values", { rangeValues: [5.99, 1.99, 10.99] }],
    ["duplicated values", { rangeValues: [1.99, 1.99, 5.99] }],
  ])("rejects %s", (_, data) => {
    expect(isFixedRangeData(data)).toBe(false);
  });
});
