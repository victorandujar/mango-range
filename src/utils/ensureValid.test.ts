import { ensureValid } from "./ensureValid";

const isString = (value: unknown): value is string => typeof value === "string";

describe("ensureValid", () => {
  it("returns the data when it passes the validation", () => {
    expect(ensureValid("mango", isString, "Not a string")).toBe("mango");
  });

  it("throws the given error message when the validation fails", () => {
    expect(() => ensureValid(42, isString, "Not a string")).toThrow("Not a string");
  });
});
