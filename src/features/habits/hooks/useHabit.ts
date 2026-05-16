import { useState } from "react";
import { loadHabit } from "../services/habit.storage";
import { HabitType } from "../types/habit.type";

function useHabit() {
  const [habits, setHabits] = useState<HabitType[]>(loadHabit());

  return {
    habits,
    setHabits,
  };
}

export default useHabit;
