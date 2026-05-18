import { DEFAULT_EVENT_WIDTH } from "../constants/timeline.constants";

import { ScheduleItem } from "../types/day-sheet.types";

import { PositionedEvent } from "../types/timeline.types";

import {
  calculateEventHeight,
  calculateEventTop,
} from "../utils/event-position";

import { isOverlapping } from "../utils/overlap-events";

export function buildPositionedEvents(
  events: ScheduleItem[],
): PositionedEvent[] {
  const positioned = events.map((event) => ({
    ...event,

    top: calculateEventTop(event.startDate),

    height: calculateEventHeight(event.startDate, event.endDate),

    width: DEFAULT_EVENT_WIDTH,

    left: 0,
  }));

  return resolveOverlaps(positioned);
}

function resolveOverlaps(events: PositionedEvent[]) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  sorted.forEach((event, index) => {
    let overlapIndex = 0;

    for (let i = 0; i < index; i++) {
      const previous = sorted[i];

      if (isOverlapping(event, previous)) {
        overlapIndex++;
      }
    }

    event.left = overlapIndex * 105;

    event.width = DEFAULT_EVENT_WIDTH;
  });

  return sorted;
}
