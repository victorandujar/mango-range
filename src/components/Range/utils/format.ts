import type { FormatValue, RangeFormat } from "../types";

export const createValueFormatter = (format?: RangeFormat): FormatValue => {
  if (!format) return String;

  const formatter = new Intl.NumberFormat(format.locale, format.options);

  return (value) => formatter.format(value);
};
