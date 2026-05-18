import { HOUR_HEIGHT, MINUTES_IN_HOUR } from "../constants/timeline.constants";

import { getMinutesFromDate } from "./time";

export function convertMinutesToPixels(minutes: number) {
  return (minutes / MINUTES_IN_HOUR) * HOUR_HEIGHT;
}

export function calculateEventTop(startDate: string) {
  const minutes = getMinutesFromDate(startDate);

  return convertMinutesToPixels(minutes);
}

export function calculateEventHeight(startDate: string, endDate: string) {
  const start = getMinutesFromDate(startDate);

  const end = getMinutesFromDate(endDate);

  const diff = end - start;

  return convertMinutesToPixels(diff);
}
