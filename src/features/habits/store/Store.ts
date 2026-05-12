import { create } from "zustand";
import { FormValuesType } from "../types/habit.types";


type FormStore = {
  data: FormValuesType;
  setField: <K extends keyof FormValuesType>(
    field: K,
    value: FormValuesType[K],
  ) => void;
  resetForm: () => void;
};

const initialData: FormValuesType = {
  HabitName: "",
  HabitType: "",
  HabitFrequency: "",
};

export const useFormStore = create<FormStore>((set) => ({
  data: initialData,
  setField: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [field]: value,
      },
    })),
  resetForm: () => set({ data: initialData }),
}));
