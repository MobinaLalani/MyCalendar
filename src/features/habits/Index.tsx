"use client";

import { useState } from "react";
import {
  Formik,
  Form,
  type FormikErrors,
  type FormikTouched,
  type FormikHelpers,
} from "formik";
import StepOne from "./components/form/StepOne";
import StepTwo from "./components/form/StepTwo";
import StepThree from "./components/form/StepThree";
import StepNavigation from "./components/form/StepNavigation";
import { useFormStore } from "./store/Store";
import { validationSchemas } from "./validation/createHabit.schema";
import { FormValuesType } from "./types/habit.types";

export default function Index() {
  const [step, setStep] = useState<number>(1);
  const { data, setField, resetForm } = useFormStore();

  const totalSteps = 3;



  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return null;
    }
  };

  const handleNext = async (
    validateForm: () => Promise<FormikErrors<FormValuesType>>,
    setTouched: (
      touched: FormikTouched<FormValuesType>,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<FormValuesType>>,
    values: FormValuesType,
  ) => {
    const errors = await validateForm();

    const currentFields: Record<number, Array<keyof FormValuesType>> = {
      1: ["firstName"],
      2: ["email"],
      3: ["password"],
    };

    const fields = currentFields[step];
    const stepErrors = fields.some((field) => Boolean(errors[field]));

    const touchedFields = fields.reduce<FormikTouched<FormValuesType>>(
      (acc, field) => {
        acc[field] = true;
        return acc;
      },
      {},
    );

    await setTouched(touchedFields, true);

    if (!stepErrors) {
      fields.forEach((field) => setField(field, values[field]));
      if (step < totalSteps) setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (
    values: FormValuesType,
    helpers: FormikHelpers<FormValuesType>,
  ) => {
    console.log("Final Submit:", values);
    alert("Form submitted successfully!");
    resetForm();
    setStep(1);
    helpers.setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl text-black font-bold mb-6">Multi Step Form</h1>

      <Formik<FormValuesType>
        initialValues={data}
        enableReinitialize
        validationSchema={validationSchemas[step - 1]}
        onSubmit={handleSubmit}
      >
        {({ validateForm, setTouched, values, submitForm }) => (
          <Form className="text-black">
            <div className="border p-4 rounded">{renderStep(step)}</div>

            <StepNavigation
              currentStep={step}
              totalSteps={totalSteps}
              onPrev={handlePrev}
              onNext={async () => {
                if (step === totalSteps) {
                  await submitForm();
                } else {
                  await handleNext(validateForm, setTouched, values);
                }
              }}
              isLastStep={step === totalSteps}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
