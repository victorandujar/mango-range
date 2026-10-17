import { NextResponse } from "next/server";
import { normalRangeMock } from "@/mocks/range";

export function GET() {
  return NextResponse.json(normalRangeMock);
}
