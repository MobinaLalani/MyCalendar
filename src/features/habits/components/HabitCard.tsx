"use client";

import { useState } from "react";
import type { HabitItem } from "../store/Store";
import ConfirmModal from "@/src/components/ui/ConfirmModal";

const typeLabels: Record<string, string> = {
  "1": "ورزشی",
  "2": "هنری",
  "3": "مطالعه",
};

const frequencyLabels: Record<string, string> = {
  "1": "۱ روز در هفته",
  "2": "۲ روز در هفته",
  "3": "۳ روز در هفته",
  "4": "۴ روز در هفته",
  "5": "روزهای فرد",
  "6": "روزهای زوج",
};

interface Props {
  habit: HabitItem;
  isEditing: boolean;
  onEdit: (habit: HabitItem) => void;
  onDelete: (id: string) => void;
}

export default function HabitCard({ habit, isEditing, onEdit, onDelete }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const completedCount = habit.completedDates?.length ?? 0;
  const typeLabel = typeLabels[String(habit.HabitType)] ?? habit.HabitType;
  const freqLabel = frequencyLabels[String(habit.HabitFrequency)] ?? habit.HabitFrequency;

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-xl border transition-all duration-200 ${
          isEditing
            ? "border-black bg-[#cce3de]"
            : "border-black/20 bg-white/3 hover:border-black/50 hover:bg-white/5"
        }`}
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${isEditing ? "bg-black" : "bg-(--yellow)"}`}
        />

        <div className="pl-4 pr-3 py-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3
                className={`font-semibold truncate ${isEditing ? "text-black" : "text-white"}`}
              >
                {habit.HabitName}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {typeLabel && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium border ${
                      isEditing
                        ? "border-black/20 bg-black/10 text-black"
                        : "border-black bg-(--yellow) text-black"
                    }`}
                  >
                    {typeLabel}
                  </span>
                )}
                {freqLabel && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs border ${
                      isEditing
                        ? "border-black/20 text-black/70"
                        : "border-white/10 bg-white/5 text-slate-400"
                    }`}
                  >
                    {freqLabel}
                  </span>
                )}
                {completedCount > 0 && (
                  <span
                    className={`text-xs font-semibold ${isEditing ? "text-black/70" : "text-amber-400"}`}
                  >
                    🔥 {completedCount} بار
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 gap-1.5">
              <button
                type="button"
                onClick={() => onEdit(habit)}
                className={`rounded-3xl px-2 py-1.5 text-xs font-semibold border transition-all duration-200 ${
                  isEditing
                    ? "border-black bg-black text-white"
                    : "border-black/30 bg-white/8 text-black hover:bg-white/15 hover:border-black/60"
                }`}
              >
                ویرایش
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="rounded-3xl px-3 py-1.5 text-xs font-semibold border border-red-500/20 bg-(--red) text-white hover:bg-[#a71e34] transition-all duration-200"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        message={`عادت "${habit.HabitName}" حذف شود؟`}
        onConfirm={() => {
          onDelete(habit.id);
          setShowDeleteModal(false);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}
