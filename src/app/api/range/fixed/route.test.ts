/**
 * @jest-environment node
 */
import { fixedRangeMock } from "@/mocks/range";
import { GET } from "./route";

describe("GET /api/range/fixed", () => {
  it("responds with the fixed range values", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(fixedRangeMock);
  });
});
