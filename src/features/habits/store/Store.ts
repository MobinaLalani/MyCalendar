import { create } from "zustand";

export type FormValues = {
  firstName: string;
  email: string;
  password: string;
};

type FormStore = {
  data: FormValues;
  setField: <K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) => void;
  resetForm: () => void;
};

const initialData: FormValues = {
  firstName: "",
  email: "",
  password: "",
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
