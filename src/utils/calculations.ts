export const calculatePercentage = (numerator: number, denominator: number): number => {
  if (denominator === 0 || !Number.isFinite(denominator) || !Number.isFinite(numerator)) {
    return 0;
  }
  const result = (numerator / denominator) * 100;
  return Number.isFinite(result) ? Math.round(result) : 0;
};

export const safeAverage = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};