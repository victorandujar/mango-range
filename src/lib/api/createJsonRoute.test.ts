/**
 * @jest-environment node
 */
import { HTTP_STATUS } from "@/constants/http";
import { ERROR_MESSAGES } from "@/constants/messages";
import { createJsonRoute } from "./createJsonRoute";

describe("Given a route handler created with createJsonRoute", () => {
  describe("When its data source resolves", () => {
    it("Then it should respond with status 200 and the data as JSON", async () => {
      const handler = createJsonRoute(() => Promise.resolve({ min: 1, max: 100 }));

      const response = await handler();

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
      expect(await response.json()).toEqual({ min: 1, max: 100 });
    });
  });

  describe("When its data source rejects with an Error", () => {
    it("Then it should respond with status 500 and the error message", async () => {
      const handler = createJsonRoute(() => Promise.reject(new Error("Source unavailable")));

      const response = await handler();

      expect(response.status).toBe(HTTP_STATUS.internalServerError);
      expect(await response.json()).toEqual({ message: "Source unavailable" });
    });
  });

  describe("When its data source rejects with something that is not an Error", () => {
    it("Then it should respond with status 500 and a generic error message", async () => {
      const handler = createJsonRoute(() => Promise.reject("timeout"));

      const response = await handler();

      expect(response.status).toBe(HTTP_STATUS.internalServerError);
      expect(await response.json()).toEqual({ message: ERROR_MESSAGES.unexpected });
    });
  });
});
