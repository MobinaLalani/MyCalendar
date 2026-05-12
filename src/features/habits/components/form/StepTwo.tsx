"use client";

import { useFormikContext } from "formik";
export type FormValues = {
  firstName: string;
  email: string;
  password: string;
};
export default function StepTwo() {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<FormValues>();

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className="border p-2 rounded w-full"
      />
      {touched.email && errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
      )}
    </div>
  );
}
