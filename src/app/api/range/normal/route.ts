import { createJsonRoute } from "@/lib/api/createJsonRoute";
import { getNormalRange } from "@/services/rangeService";

export const GET = createJsonRoute(getNormalRange);
