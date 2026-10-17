import { ERROR_MESSAGES } from "@/constants/messages";
import { fixedRangeMock, normalRangeMock } from "@/mocks/range";
import { getFixedRange, getNormalRange } from "./rangeService";

jest.mock("@/mocks/range", () => ({
  normalRangeMock: { min: 1, max: 100 },
  fixedRangeMock: { rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] },
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Given the getNormalRange service", () => {
  describe("When the source provides a valid min and max", () => {
    it("Then it should resolve with the min and max values", async () => {
      await expect(getNormalRange()).resolves.toEqual({ min: 1, max: 100 });
    });
  });

  describe("When the source provides a min value greater than the max value", () => {
    it("Then it should reject with the invalid normal range error", async () => {
      jest.replaceProperty(normalRangeMock, "min", 100);

      await expect(getNormalRange()).rejects.toThrow(ERROR_MESSAGES.invalidNormalRange);
    });
  });
});

describe("Given the getFixedRange service", () => {
  describe("When the source provides a valid list of values", () => {
    it("Then it should resolve with the range values", async () => {
      await expect(getFixedRange()).resolves.toEqual({
        rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
      });
    });
  });

  describe("When the source provides unsorted values", () => {
    it("Then it should reject with the invalid fixed range error", async () => {
      jest.replaceProperty(fixedRangeMock, "rangeValues", [5.99, 1.99]);

      await expect(getFixedRange()).rejects.toThrow(ERROR_MESSAGES.invalidFixedRange);
    });
  });
});
