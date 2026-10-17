/**
 * @jest-environment node
 */
import { HTTP_STATUS } from "@/constants/http";
import { ERROR_MESSAGES } from "@/constants/messages";
import { createJsonRoute } from "./createJsonRoute";

describe("createJsonRoute", () => {
  it("responds with status 200 and the resolved data as JSON", async () => {
    const handler = createJsonRoute(() => Promise.resolve({ min: 1, max: 100 }));

    const response = await handler();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual({ min: 1, max: 100 });
  });

  it("responds with status 500 and the error message when the data source fails", async () => {
    const handler = createJsonRoute(() => Promise.reject(new Error("Source unavailable")));

    const response = await handler();

    expect(response.status).toBe(HTTP_STATUS.internalServerError);
    expect(await response.json()).toEqual({ message: "Source unavailable" });
  });

  it("responds with a generic message when the failure is not an Error", async () => {
    const handler = createJsonRoute(() => Promise.reject("timeout"));

    const response = await handler();

    expect(response.status).toBe(HTTP_STATUS.internalServerError);
    expect(await response.json()).toEqual({ message: ERROR_MESSAGES.unexpected });
  });
});
