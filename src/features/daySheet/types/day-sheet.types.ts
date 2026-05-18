export type ScheduleItemType = "task" | "habit" | "event";

export type ScheduleItem = {
  id: string;

  type: ScheduleItemType;

  title: string;

  description?: string;

  startDate: string;

  endDate: string;

  completed?: boolean;

  color?: string;

  icon?: string;

  sourceId?: string;
};
