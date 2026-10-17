import type { RangeFormat } from "@/components/Range";

export const PRICE_FORMAT = {
  locale: "es-ES",
  options: {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
} as const satisfies RangeFormat;
