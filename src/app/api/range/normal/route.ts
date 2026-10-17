import { NextResponse } from "next/server";
import { getNormalRange } from "@/services/rangeService";

export async function GET() {
  try {
    return NextResponse.json(await getNormalRange());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
