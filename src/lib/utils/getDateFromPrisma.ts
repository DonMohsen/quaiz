/**
 * Convert a Date (or string) into YYYY-MM-DD format
 * @param date - Date | string
 * @returns string like "2025-01-01"
 */
export function getDateFromPrisma(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    throw new Error("Invalid date provided to formatDate");
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
