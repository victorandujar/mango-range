/**
 * @jest-environment node
 */
import { normalRangeMock } from "@/mocks/range";
import { GET } from "./route";

describe("GET /api/range/normal", () => {
  it("responds with the normal range data", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(normalRangeMock);
  });
});
