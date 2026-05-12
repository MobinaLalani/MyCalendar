"use client";

import { useFormikContext } from "formik";
export type FormValues = {
  firstName: string;
  email: string;
  password: string;
};
export default function StepOne() {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<FormValues>();

  const firstNameError =
    touched.firstName && typeof errors.firstName === "string"
      ? errors.firstName
      : null;

  return (
    <div>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        className="border p-2 rounded w-full"
      />

      {firstNameError && (
        <p className="text-red-500 text-sm mt-1">{firstNameError}</p>
      )}
    </div>
  );
}
