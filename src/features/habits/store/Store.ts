import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { FormValuesType } from "../types/habit.types";

export type HabitItem = FormValuesType & {
  id: string;
  createdAt: string;
};

type FormStore = {
  data: FormValuesType;
  habits: HabitItem[];

  setField: <K extends keyof FormValuesType>(
    field: K,
    value: FormValuesType[K],
  ) => void;

  setFields: (values: Partial<FormValuesType>) => void;
  saveHabit: () => void;
  resetForm: () => void;
  removeHabit: (id: string) => void;
  clearHabits: () => void;
};

const initialData: FormValuesType = {
  HabitName: "",
  HabitType: "",
  HabitFrequency: "",
  HabitStartDate: "",
};

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      data: initialData,
      habits: [],

      setField: (field, value) =>
        set((state) => ({
          data: {
            ...state.data,
            [field]: value,
          },
        })),

      setFields: (values) =>
        set((state) => ({
          data: {
            ...state.data,
            ...values,
          },
        })),

      saveHabit: () => {
        const currentData = get().data;

        const newHabit: HabitItem = {
          ...currentData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          habits: [...state.habits, newHabit],
          data: initialData,
        }));
      },

      resetForm: () => set({ data: initialData }),

      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),

      clearHabits: () => set({ habits: [] }),
    }),
    {
      name: "habit-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
