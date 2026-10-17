export const ensureValid = <T>(
  data: unknown,
  isValid: (value: unknown) => value is T,
  errorMessage: string,
): T => {
  if (!isValid(data)) {
    throw new Error(errorMessage);
  }

  return data;
};
