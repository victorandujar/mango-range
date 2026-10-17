export const parseNumber = (text: string): number | null => {
  const trimmedText = text.trim();

  if (!trimmedText) return null;

  const value = Number(trimmedText);

  return Number.isFinite(value) ? value : null;
};
