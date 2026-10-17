import { createValueFormatter } from "@/components/Range/utils/format";
import { PRICE_FORMAT } from "@/config/format";

export const formatPrice = createValueFormatter(PRICE_FORMAT);
