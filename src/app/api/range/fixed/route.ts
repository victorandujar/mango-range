import { createJsonRoute } from "@/lib/api/createJsonRoute";
import { getFixedRange } from "@/services/rangeService";

export const GET = createJsonRoute(getFixedRange);
