"use client";

import { useFormikContext } from "formik";
import { FormValuesType } from "../../types/habit.types";
const getFieldError = (
  error: unknown,
  touched: boolean | undefined,
): string | null => {
  if (!touched) return null;
  return typeof error === "string" ? error : null;
};

export default function StepThree() {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<FormValuesType>(); 
  const passwordError = getFieldError(
    errors.HabitFrequency,
    touched.HabitFrequency,
  );

  return (
    <div>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={values.HabitFrequency}
        onChange={handleChange}
        onBlur={handleBlur}
        className="border p-2 rounded w-full text-black"
      />
      {passwordError && (
        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
      )}
    </div>
  );
}
