import { ScheduleItem } from "./day-sheet.types";

export type PositionedEvent = ScheduleItem & {
  top: number;

  height: number;

  width: number;

  left: number;

  zIndex?: number;
};

export type OverlapGroup = {
  id: string;

  events: PositionedEvent[];
};
