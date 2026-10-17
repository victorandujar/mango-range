/**
 * @jest-environment node
 */
import { normalRangeMock } from "@/mocks/range";
import { GET } from "./route";

describe("Given the GET /api/range/normal endpoint", () => {
  describe("When it receives a request", () => {
    it("Then it should respond with status 200 and the normal range min and max", async () => {
      const response = await GET();

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(normalRangeMock);
    });
  });
});
