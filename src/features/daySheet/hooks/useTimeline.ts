import { useMemo } from "react";

import { ScheduleItem } from "../types/day-sheet.types";

import { buildPositionedEvents } from "../services/timeline.service";

export function useTimeline(items: ScheduleItem[]) {
  const events = useMemo(() => buildPositionedEvents(items), [items]);

  return {
    events,
  };
}
