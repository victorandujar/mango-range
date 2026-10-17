/**
 * @jest-environment node
 */
import { getFixedRange } from "@/services/rangeService";
import { GET } from "./route";

jest.mock("@/services/rangeService", () => ({
  getFixedRange: jest.fn(),
}));

const getFixedRangeMock = jest.mocked(getFixedRange);

describe("GET /api/range/fixed", () => {
  it("responds with status 200 and the list of range values", async () => {
    getFixedRangeMock.mockResolvedValueOnce({ rangeValues: [1.99, 5.99, 10.99] });

    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual({ rangeValues: [1.99, 5.99, 10.99] });
  });

  it("responds with status 500 and the error message when the service fails", async () => {
    getFixedRangeMock.mockRejectedValueOnce(new Error("Invalid fixed range data"));

    const response = await GET();

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ message: "Invalid fixed range data" });
  });
});
