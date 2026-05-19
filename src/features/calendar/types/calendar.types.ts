export type PlannerTask = {
  id: string;
  dateKey: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  completed: boolean;
  createdAt: string;
};



export type PlannerTaskInput = {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
};
export type PersianDateParts = {
  year: number;
  month: number;
  day: number;
  monthName: string;
  weekdayName: string;
  fullLabel: string;
};

export type CalendarDay = {
  dateKey: string;
  date: Date;
  persian: PersianDateParts;
  gregorianDay: string;
  isToday: boolean;
  isSelected: boolean;
};

export type CalendarMonth = {
  year: number;
  month: number;
  monthName: string;
  monthLabel: string;
  days: CalendarDay[];
  leadingEmptyDays: number;
};
