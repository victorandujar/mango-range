import { NextResponse } from "next/server";
import { fixedRangeMock } from "@/mocks/range";

export function GET() {
  return NextResponse.json(fixedRangeMock);
}
