export const append = <T>(list: T[], item: T): T[] => [...list, item];

export const clamp = (value: number, min: number, max: number): number => {
  min = min ?? Number.NEGATIVE_INFINITY;
  max = max ?? Number.POSITIVE_INFINITY;
  return Math.max(min, Math.min(max, value))
}