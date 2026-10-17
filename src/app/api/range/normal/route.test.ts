/**
 * @jest-environment node
 */
import { GET } from "./route";

describe("GET /api/range/normal", () => {
  it("responds with status 200 and the min and max values", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual({ min: 1, max: 100 });
  });
});
