import { fixedRangeMock, normalRangeMock } from "@/mocks/range";
import { getFixedRange, getNormalRange } from "./rangeService";

jest.mock("@/mocks/range", () => ({
  normalRangeMock: { min: 1, max: 100 },
  fixedRangeMock: { rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] },
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe("getNormalRange", () => {
  it("resolves with the normal range data", async () => {
    await expect(getNormalRange()).resolves.toEqual({ min: 1, max: 100 });
  });

  it("rejects when the source data is invalid", async () => {
    jest.replaceProperty(normalRangeMock, "min", 100);

    await expect(getNormalRange()).rejects.toThrow("Invalid normal range data");
  });
});

describe("getFixedRange", () => {
  it("resolves with the fixed range values", async () => {
    await expect(getFixedRange()).resolves.toEqual({
      rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    });
  });

  it("rejects when the source data is invalid", async () => {
    jest.replaceProperty(fixedRangeMock, "rangeValues", [5.99, 1.99]);

    await expect(getFixedRange()).rejects.toThrow("Invalid fixed range data");
  });
});
