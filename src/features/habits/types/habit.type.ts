export type HabitType = {
  id: string;
  HabitName: string;
  HabitType: number;
  HabitFrequency: number;
  HabitStartDate: string;
  createdAt: string;
  completed?: boolean;
  completedDates?: string[];
};
