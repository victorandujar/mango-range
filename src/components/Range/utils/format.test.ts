import { TEST_EURO_FORMAT } from "../testing/rangeTestConfig";
import { createValueFormatter } from "./format";

describe("Given a value formatter created without a format", () => {
  describe("When it formats the values 1 and 5.99", () => {
    it("Then it should return the plain numbers as text, 1 and 5.99", () => {
      const formatValue = createValueFormatter();

      expect(formatValue(1)).toBe("1");
      expect(formatValue(5.99)).toBe("5.99");
    });
  });
});

describe("Given a value formatter created with an euro currency format for the en-US locale", () => {
  describe.each([
    [1, "€1"],
    [5.99, "€5.99"],
    [10000, "€10,000"],
  ])("When it formats the value %p", (value, expected) => {
    it(`Then it should return the value as an euro amount, ${expected}`, () => {
      expect(createValueFormatter(TEST_EURO_FORMAT)(value)).toBe(expected);
    });
  });
});

describe("Given a value formatter created with an euro currency format for the es-ES locale", () => {
  describe("When it formats the value 70.99", () => {
    it("Then it should follow the Spanish conventions, with a decimal comma and the symbol after the amount", () => {
      const formatValue = createValueFormatter({
        locale: "es-ES",
        options: { style: "currency", currency: "EUR" },
      });

      expect(formatValue(70.99)).toBe("70,99 €");
    });
  });
});
