export function getMinutesFromDate(date: string): number {
  const target = new Date(date);

  return target.getHours() * 60 + target.getMinutes();
}

export function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function minutesBetween(start: string, end: string) {
  return getMinutesFromDate(end) - getMinutesFromDate(start);
}
