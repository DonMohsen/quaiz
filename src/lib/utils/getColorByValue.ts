// utils/getColorByValue.ts
export function getColorByValue(value: number): string {
  if (value <= 15) return "#ef4444"; // red
  if (value <= 30) return "#f97316"; // orange
  if (value <= 50) return "#facc15"; // yellow
  if (value <= 70) return "#84cc16"; // light green
  if (value <= 100) return "#22c55e"; // green
  return "#22c55e"; // default to green if >100
}
