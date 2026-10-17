import { isFiniteNumber, isRecord } from "./typeGuards";

describe("isRecord", () => {
  it.each([{}, { key: "value" }, []])("returns true for %p", (value) => {
    expect(isRecord(value)).toBe(true);
  });

  it.each([null, undefined, 1, "text", true])("returns false for %p", (value) => {
    expect(isRecord(value)).toBe(false);
  });
});

describe("isFiniteNumber", () => {
  it.each([0, -1, 1.99, Number.MAX_SAFE_INTEGER])("returns true for %p", (value) => {
    expect(isFiniteNumber(value)).toBe(true);
  });

  it.each([Number.NaN, Infinity, -Infinity, "1", null, undefined])(
    "returns false for %p",
    (value) => {
      expect(isFiniteNumber(value)).toBe(false);
    },
  );
});
