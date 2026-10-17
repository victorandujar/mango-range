import { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/constants/http";
import { ERROR_MESSAGES } from "@/constants/messages";

export const createJsonRoute =
  <T>(getData: () => Promise<T>) =>
  async () => {
    try {
      return NextResponse.json(await getData());
    } catch (error) {
      const message = error instanceof Error ? error.message : ERROR_MESSAGES.unexpected;

      return NextResponse.json({ message }, { status: HTTP_STATUS.internalServerError });
    }
  };
