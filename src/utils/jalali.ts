import type {
  CalendarDay,
  CalendarMonth,
  PersianDateParts,
} from "../features/calendar/types/calendar.types";

const persianDateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
});

const persianNumericFormatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const gregorianDayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
});

export const WEEKDAY_LABELS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
] as const;

export const WEEKDAY_SHORT_LABELS = [
  "ش",
  "ی",
  "د",
  "س",
  "چ",
  "پ",
  "ج",
] as const;

const padNumber = (value: number) => value.toString().padStart(2, "0");

export function toDateKey(date: Date) {
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
}

export function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getPersianDateParts(date: Date): PersianDateParts {
  const parts = persianDateFormatter.formatToParts(date);
  const numericParts = persianNumericFormatter.formatToParts(date);
  const valueByType = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );
  const numericValueByType = Object.fromEntries(
    numericParts.map((part) => [part.type, part.value]),
  );

  return {
    year: Number.parseInt(numericValueByType.year, 10),
    month: Number.parseInt(numericValueByType.month, 10),
    day: Number.parseInt(numericValueByType.day, 10),
    monthName: valueByType.month,
    weekdayName: valueByType.weekday,
    fullLabel: persianDateFormatter.format(date),
  };
}

export function isSameDate(left: Date, right: Date) {
  return toDateKey(left) === toDateKey(right);
}

export function isSamePersianMonth(left: Date, right: Date) {
  const leftParts = getPersianDateParts(left);
  const rightParts = getPersianDateParts(right);

  return (
    leftParts.year === rightParts.year && leftParts.month === rightParts.month
  );
}

export function getStartOfPersianMonth(anchorDate: Date) {
  const current = new Date(anchorDate);

  while (true) {
    const previous = new Date(current);
    previous.setDate(previous.getDate() - 1);

    if (!isSamePersianMonth(current, previous)) {
      return current;
    }

    current.setDate(current.getDate() - 1);
  }
}

export function getDaysInPersianMonth(anchorDate: Date) {
  const start = getStartOfPersianMonth(anchorDate);
  const monthDays: Date[] = [];
  const cursor = new Date(start);

  while (isSamePersianMonth(cursor, start)) {
    monthDays.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return monthDays;
}

export function getWeekIndex(date: Date) {
  return (date.getDay() + 1) % 7;
}

export function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export function getPreviousPersianMonth(anchorDate: Date) {
  return addDays(getStartOfPersianMonth(anchorDate), -1);
}

export function getNextPersianMonth(anchorDate: Date) {
  const monthDays = getDaysInPersianMonth(anchorDate);
  return addDays(monthDays[monthDays.length - 1], 1);
}

export function getTodayDateKey() {
  return toDateKey(new Date());
}

export function buildCalendarMonth(
  anchorDate: Date,
  selectedDateKey: string,
): CalendarMonth {
  const monthDays = getDaysInPersianMonth(anchorDate);
  const monthParts = getPersianDateParts(anchorDate);
  const todayKey = getTodayDateKey();

  const days: CalendarDay[] = monthDays.map((date) => {
    const dateKey = toDateKey(date);

    return {
      date,
      dateKey,
      persian: getPersianDateParts(date),
      gregorianDay: gregorianDayFormatter.format(date),
      isToday: dateKey === todayKey,
      isSelected: dateKey === selectedDateKey,
    };
  });

  return {
    year: monthParts.year,
    month: monthParts.month,
    monthName: monthParts.monthName,
    monthLabel: `${monthParts.monthName} ${monthParts.year}`,
    days,
    leadingEmptyDays: getWeekIndex(monthDays[0]),
  };
}

export function getWeekDays(anchorDate: Date): Date[] {
  const weekIndex = getWeekIndex(anchorDate);
  const startOfWeek = addDays(anchorDate, -weekIndex);
  return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));
}

export function getRelativeLabel(date: Date) {
  const dateKey = toDateKey(date);
  const today = new Date();
  const tomorrow = addDays(today, 1);

  if (dateKey === toDateKey(today)) {
    return "امروز";
  }

  if (dateKey === toDateKey(tomorrow)) {
    return "فردا";
  }

  return getPersianDateParts(date).weekdayName;
}
