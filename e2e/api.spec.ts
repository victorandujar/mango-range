import { expect, test } from "@playwright/test";
import { fixedRangeMock, normalRangeMock } from "@/mocks/range";

const ENDPOINTS = [
  { path: "/api/range/normal", body: normalRangeMock },
  { path: "/api/range/fixed", body: fixedRangeMock },
] as const;

test.describe("Given the mocked HTTP range service", () => {
  for (const { path, body } of ENDPOINTS) {
    test.describe(`When a GET request is sent to ${path}`, () => {
      test("Then it should respond with status 200 and the range data as JSON", async ({
        request,
      }) => {
        const response = await request.get(path);

        expect(response.ok()).toBe(true);
        expect(response.headers()["content-type"]).toContain("application/json");
        expect(await response.json()).toEqual(body);
      });
    });
  }
});
