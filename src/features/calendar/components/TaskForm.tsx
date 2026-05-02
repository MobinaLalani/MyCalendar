"use client";

import { useState } from "react";

import type { PlannerTaskInput } from "../types/calendar.types";

type TaskFormProps = {
  onSubmit: (input: PlannerTaskInput) => boolean;
};

const initialFormState: PlannerTaskInput = {
  title: "",
  time: "",
  description: "",
};

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [formState, setFormState] = useState<PlannerTaskInput>(initialFormState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAdded = onSubmit(formState);

    if (isAdded) {
      setFormState(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-3">
      <FormField label="عنوان برنامه" htmlFor="task-title">
        <input
          id="task-title"
          value={formState.title}
          onChange={(event) =>
            setFormState((currentState) => ({
              ...currentState,
              title: event.target.value,
            }))
          }
          placeholder="مثلا جلسه کاری یا ورزش"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
        />
      </FormField>

      <FormField label="ساعت" htmlFor="task-time">
        <input
          id="task-time"
          type="time"
          value={formState.time}
          onChange={(event) =>
            setFormState((currentState) => ({
              ...currentState,
              time: event.target.value,
            }))
          }
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
        />
      </FormField>

      <FormField label="توضیحات" htmlFor="task-description">
        <textarea
          id="task-description"
          value={formState.description}
          onChange={(event) =>
            setFormState((currentState) => ({
              ...currentState,
              description: event.target.value,
            }))
          }
          rows={4}
          placeholder="جزئیات، یادآوری یا نکته های مهم"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
        />
      </FormField>

      <button
        type="submit"
        className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        ثبت برنامه برای این روز
      </button>
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
