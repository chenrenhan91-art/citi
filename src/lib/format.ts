export function formatGBP(pence: number): string {
  const pounds = pence / 100;
  if (Number.isInteger(pounds)) {
    return `£${pounds.toLocaleString("en-GB")}`;
  }
  return `£${pounds.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
