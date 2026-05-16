import { HabitType } from "../types/habit.type";
import { safeStorage } from "@/src/utils/storage";

type HabitStorageType = {
  state: {
    data: unknown;
    habits: HabitType[];
  };
  version: number;
};

export function loadHabit(): HabitType[] {
  const storage = safeStorage.get<HabitStorageType>(
    "habit-storage",
    {} as HabitStorageType,
  );

  return storage?.state?.habits || [];
}

export function saveHabit(Habits: HabitType[]) {
  safeStorage.set("habit-storage", {
    state: {
      habits: Habits,
    },
    version: 0,
  });
}
