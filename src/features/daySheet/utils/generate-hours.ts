import { DAY_END_HOUR, DAY_START_HOUR } from "../constants/timeline.constants";

import { formatHour } from "./time";

export function generateHours() {
  return Array.from(
    {
      length: DAY_END_HOUR - DAY_START_HOUR,
    },
    (_, index) => formatHour(index + DAY_START_HOUR),
  );
}
