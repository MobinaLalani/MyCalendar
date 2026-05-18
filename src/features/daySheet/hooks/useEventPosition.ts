"use client";
import {
  calculateEventHeight,
  calculateEventTop,
} from "../utils/event-position";

export function useEventPosition(startDate: string, endDate: string) {
  const top = calculateEventTop(startDate);

  const height = calculateEventHeight(startDate, endDate);

  return {
    top,
    height,
  };
}
