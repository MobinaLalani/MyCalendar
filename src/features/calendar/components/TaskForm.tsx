import { useState } from "react";
import type { PlannerTaskInput } from "../types/calendar.types";
import CloseIcon from '../../../components/icons/closeRedIcon.svg';
type TaskFormProps = {
  onSubmit: (input: PlannerTaskInput) => boolean;
  onCancel?: () => void;
};

const initialFormState: PlannerTaskInput = {
  title: "",
  time: "",
  description: "",
};

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [formState, setFormState] =
    useState<PlannerTaskInput>(initialFormState);

  const handleChange =
    (key: keyof PlannerTaskInput) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((currentState) => ({
        ...currentState,
        [key]: event.target.value,
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAdded = onSubmit(formState);

    if (isAdded) {
      setFormState(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <FormField label="عنوان برنامه" htmlFor="task-title">
        <input
          id="task-title"
          value={formState.title}
          onChange={handleChange("title")}
          placeholder="مثلا جلسه کاری یا ورزش"
          className="w-full rounded-2xl border border-gray-700  px-4 py-3 text-sm text-(--text-foreground) outline-none transition placeholder:text-slate-500 focus:shadow-gray-300"
        />
      </FormField>

      <FormField label="ساعت" htmlFor="task-time">
        <input
          id="task-time"
          type="time"
          value={formState.time}
          onChange={handleChange("time")}
          className="w-full rounded-2xl border border-gray-700  px-4 py-3 text-sm text-(--text-foreground) outline-none transition focus:shadow-gray-300 "
        />
      </FormField>

      <FormField label="توضیحات" htmlFor="task-description">
        <textarea
          id="task-description"
          rows={4}
          value={formState.description}
          onChange={handleChange("description")}
          placeholder="جزئیات، یادآوری یا نکته های مهم"
          className="w-full rounded-2xl border border-gray-700  px-4 py-3 text-sm text-(--text-foreground) outline-none transition placeholder:text-slate-500 focus:shadow-md focus:shadow-gray-300"
        />
      </FormField>

      <div className="flex flex-col gap-2 sm:flex-row">
        {/* دکمه بزرگ */}
        <button
          type="submit"
          className="flex-1 rounded-2xl bg-(--surface) border border-black px-3 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          ثبت برنامه
        </button>

        {/* دکمه کوچک قرمز */}
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl border border-black bg-[#eb7171] text-slate-200 transition hover:bg-white/10"
          >
            <CloseIcon />
          </button>
        ) : null}
      </div>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
};

function FormField({ label, htmlFor, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm text-(--text-foreground)"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
