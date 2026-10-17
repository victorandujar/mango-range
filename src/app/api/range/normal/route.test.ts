/**
 * @jest-environment node
 */
import { getNormalRange } from "@/services/rangeService";
import { GET } from "./route";

jest.mock("@/services/rangeService", () => ({
  getNormalRange: jest.fn(),
}));

const getNormalRangeMock = jest.mocked(getNormalRange);

describe("GET /api/range/normal", () => {
  it("responds with status 200 and the min and max values", async () => {
    getNormalRangeMock.mockResolvedValueOnce({ min: 1, max: 100 });

    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual({ min: 1, max: 100 });
  });

  it("responds with status 500 and the error message when the service fails", async () => {
    getNormalRangeMock.mockRejectedValueOnce(new Error("Invalid normal range data"));

    const response = await GET();

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ message: "Invalid normal range data" });
  });
});
