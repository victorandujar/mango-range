import { fixedRangeMock, normalRangeMock } from "@/mocks/range";
import {
  getFixedRange,
  getNormalRange,
  isFixedRangeData,
  isNormalRangeData,
  rangeEndpoints,
} from "./rangeService";

const fetchMock = jest.fn();

const mockResponse = (body: unknown, status = 200) => {
  fetchMock.mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
};

beforeAll(() => {
  global.fetch = fetchMock;
});

beforeEach(() => {
  fetchMock.mockReset();
});

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

describe("getNormalRange", () => {
  it("requests the normal range endpoint and returns its data", async () => {
    mockResponse(normalRangeMock);

    await expect(getNormalRange()).resolves.toEqual(normalRangeMock);
    expect(fetchMock).toHaveBeenCalledWith(rangeEndpoints.normal, { signal: undefined });
  });

  it("forwards the abort signal to fetch", async () => {
    const controller = new AbortController();
    mockResponse(normalRangeMock);

    await getNormalRange(controller.signal);

    expect(fetchMock).toHaveBeenCalledWith(rangeEndpoints.normal, { signal: controller.signal });
  });

  it("throws when the response is not successful", async () => {
    mockResponse({ message: "Internal error" }, 500);

    await expect(getNormalRange()).rejects.toThrow("failed with status 500");
  });

  it("throws when the response has an unexpected format", async () => {
    mockResponse({ min: 100, max: 1 });

    await expect(getNormalRange()).rejects.toThrow("Unexpected response format");
  });

  it("propagates network errors", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));

    await expect(getNormalRange()).rejects.toThrow("Failed to fetch");
  });
});

describe("getFixedRange", () => {
  it("requests the fixed range endpoint and returns its data", async () => {
    mockResponse(fixedRangeMock);

    await expect(getFixedRange()).resolves.toEqual(fixedRangeMock);
    expect(fetchMock).toHaveBeenCalledWith(rangeEndpoints.fixed, { signal: undefined });
  });

  it("throws when the response is not successful", async () => {
    mockResponse(null, 404);

    await expect(getFixedRange()).rejects.toThrow("failed with status 404");
  });

  it("throws when the response has an unexpected format", async () => {
    mockResponse({ rangeValues: [] });

    await expect(getFixedRange()).rejects.toThrow("Unexpected response format");
  });
});
