/**
 * @jest-environment node
 */
import { GET } from "./route";

describe("GET /api/range/fixed", () => {
  it("responds with status 200 and the list of range values", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual({
      rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    });
  });
});
