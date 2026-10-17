/**
 * @jest-environment node
 */
import { fixedRangeMock } from "@/mocks/range";
import { GET } from "./route";

describe("Given the GET /api/range/fixed endpoint", () => {
  describe("When it receives a request", () => {
    it("Then it should respond with status 200 and the fixed range values", async () => {
      const response = await GET();

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(fixedRangeMock);
    });
  });
});
