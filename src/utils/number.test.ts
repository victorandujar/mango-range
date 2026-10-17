import { parseNumber } from "./number";

describe("Given the parseNumber helper", () => {
  describe.each([
    ["42", 42],
    ["5.99", 5.99],
    ["-10", -10],
    ["  30  ", 30],
  ])('When it receives the text "%s"', (text, expected) => {
    it(`Then it should return the number ${expected}`, () => {
      expect(parseNumber(text)).toBe(expected);
    });
  });

  describe.each([
    ["an empty text", ""],
    ["a text with only spaces", "   "],
    ["a text that is not a number", "mango"],
    ["an infinite value", "Infinity"],
  ])("When it receives %s", (_, text) => {
    it("Then it should return null, as there is no valid number", () => {
      expect(parseNumber(text)).toBeNull();
    });
  });
});
