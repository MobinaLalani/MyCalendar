import { HabitType } from "../types/habit.type";

export function sortHabits(habits: HabitType[]) {
  return [...habits].sort((left, right) => {
    return (
      new Date(right.HabitStartDate).getTime() -
      new Date(left.HabitStartDate).getTime()
    );
  });
}


export function getHabitsForDate(habits: HabitType[], dateKey: string) {
  return sortHabits(
    habits.filter((habit) => {
      const habitDate = new Date(habit.HabitStartDate);
     
      // گرفتن فقط بخش YYYY-MM-DD بدون تأثیر timezone
      const habitDateKey = habitDate.toISOString().slice(0, 10);
       console.log("habitDateKey", habitDateKey);
           console.log("dateKey", dateKey);
      return habitDateKey === dateKey;
    }),
  );
}