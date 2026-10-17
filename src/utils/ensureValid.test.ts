import { ensureValid } from "./ensureValid";

const isString = (value: unknown): value is string => typeof value === "string";

describe("Given the ensureValid helper with a string validator", () => {
  describe("When it receives data that passes the validation", () => {
    it("Then it should return the same data", () => {
      expect(ensureValid("mango", isString, "Not a string")).toBe("mango");
    });
  });

  describe("When it receives data that fails the validation", () => {
    it("Then it should throw an error with the given message", () => {
      expect(() => ensureValid(42, isString, "Not a string")).toThrow("Not a string");
    });
  });
});
