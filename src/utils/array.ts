export const isStrictlyAscending = ([current, next, ...rest]: number[]): boolean =>
  current === undefined ||
  next === undefined ||
  (current < next && isStrictlyAscending([next, ...rest]));
