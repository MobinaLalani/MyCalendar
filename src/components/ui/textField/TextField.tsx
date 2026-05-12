"use client";

import { useField } from "formik";

type TextFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export default function TextField({
  label,
  name,
  type = "text",
  className = "",
}: TextFieldProps) {
  const [field, meta] = useField(name);

  const error = meta.touched && meta.error ? meta.error : null;

  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...field}
        className={`  w-full rounded-2xl border px-4 py-3 text-sm 
          outline-none transition bob ${className}`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
