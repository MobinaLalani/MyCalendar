import { create } from "zustand";

type DaySheetStore = {
  selectedDate: string;

  selectedEventId?: string;

  isCreateModalOpen: boolean;

  setSelectedDate: (date: string) => void;

  setSelectedEventId: (id?: string) => void;

  openCreateModal: () => void;

  closeCreateModal: () => void;
};

export const useDaySheetStore = create<DaySheetStore>((set) => ({
  selectedDate: new Date().toISOString(),

  selectedEventId: undefined,

  isCreateModalOpen: false,

  setSelectedDate: (date) =>
    set({
      selectedDate: date,
    }),

  setSelectedEventId: (id) =>
    set({
      selectedEventId: id,
    }),

  openCreateModal: () =>
    set({
      isCreateModalOpen: true,
    }),

  closeCreateModal: () =>
    set({
      isCreateModalOpen: false,
    }),
}));
