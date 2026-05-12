"use client";

import { useFormikContext } from "formik";

// تابع کمکی برای نمایش خطا (اختیاری ولی تمیزتر)
const getFieldError = (
  error: unknown,
  touched: boolean | undefined,
): string | null => {
  if (!touched) return null;
  return typeof error === "string" ? error : null;
};
export type FormValues = {
  firstName: string;
  email: string;
  password: string;
};
export default function StepThree() {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<FormValues>(); // <any> را با <FormValues> جایگزین کنید

  const passwordError = getFieldError(errors.password, touched.password);

  return (
    <div>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={values.password}
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
