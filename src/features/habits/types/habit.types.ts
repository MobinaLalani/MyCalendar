import type { DateObject } from "react-multi-date-picker";
export type FormValuesType = {
  HabitName: string;
  HabitType: string;
  HabitFrequency: string;
  HabitStartDate: DateObject | null | string;
};
