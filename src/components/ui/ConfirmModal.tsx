"use client";

import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "تایید حذف",
  message,
  confirmLabel = "بله، حذف شود",
  cancelLabel = "انصراف",
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-sm mx-4 rounded-2xl border border-black bg-white p-6 shadow-2xl"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-2 text-base font-bold text-black">{title}</h2>
        <p className="mb-6 text-sm text-black/60">{message}</p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl border border-black bg-(--red) py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-85"
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-black bg-white py-2.5 text-sm font-semibold text-black transition-colors hover:bg-black/5"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
