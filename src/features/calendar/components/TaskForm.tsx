import { useState } from "react";
import type { PlannerTaskInput } from "../types/calendar.types";

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
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
        />
      </FormField>

      <FormField label="ساعت" htmlFor="task-time">
        <input
          id="task-time"
          type="time"
          value={formState.time}
          onChange={handleChange("time")}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
        />
      </FormField>

      <FormField label="توضیحات" htmlFor="task-description">
        <textarea
          id="task-description"
          rows={4}
          value={formState.description}
          onChange={handleChange("description")}
          placeholder="جزئیات، یادآوری یا نکته های مهم"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
        />
      </FormField>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="flex-1 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          ثبت برنامه
        </button>

        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10"
          >
            انصراف
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
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}
