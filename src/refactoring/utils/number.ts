export const clamp = (
  value: number,
  min: number | null,
  max: number | null,
): number => {
  min = min ?? Number.NEGATIVE_INFINITY;
  max = max ?? Number.POSITIVE_INFINITY;
  return Math.max(min, Math.min(max, value));
};
