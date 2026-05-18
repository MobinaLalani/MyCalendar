import { ScheduleItem } from "../types/day-sheet.types";

export function isOverlapping(current: ScheduleItem, target: ScheduleItem) {
  const currentStart = new Date(current.startDate).getTime();

  const currentEnd = new Date(current.endDate).getTime();

  const targetStart = new Date(target.startDate).getTime();

  const targetEnd = new Date(target.endDate).getTime();

  return currentStart < targetEnd && currentEnd > targetStart;
}
