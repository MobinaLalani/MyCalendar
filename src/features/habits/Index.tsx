"use client";

import { useState } from "react";
import {
  Formik,
  Form,
  type FormikErrors,
  type FormikTouched,
  type FormikHelpers,
} from "formik";
import StepOne from "./components/form/HabitName";
import StepTwo from "./components/form/HabitType";
import StepNavigation from "./components/form/StepNavigation";
import HabitFrequency from "./components/form/HabitFrequency";
import { useFormStore } from "./store/Store";
import { FormValuesType } from "./types/habit.types";
import HabitStartDate from "./components/form/HabitStartDate";
import HabitMicroGoal from "./components/form/HabitMicroGoal";

export default function Index() {
  const [step, setStep] = useState<number>(1);
const { saveHabit, resetForm, data ,setField } = useFormStore();

  const totalSteps = 5;



  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <HabitFrequency />;
      case 4: 
        return <HabitStartDate />;
      case 5:
        return <HabitMicroGoal/>;
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
      1: ["HabitName"],
      2: ["HabitType"],
      3: ["HabitFrequency"],
      4: ["HabitStartDate"],
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
    saveHabit(); // عادت را ذخیره کن
    resetForm(); // فرم را ریست کن
    setStep(1);
    helpers.setSubmitting(false);
  };

  return (
    <div className="min-h-[94vh] flex pr-5">
      <div className="grid flex-1 gap-2 xl:grid-cols-[minmax(0,1.6fr)_minmax(22rem,0.78fr)] ">
        <div className=" p-6">
          <h1 className="text-2xl text-black font-bold mb-6">
          فرم ثبت عادت خوب 
          </h1>
          <Formik<FormValuesType>
            initialValues={data}
            enableReinitialize
            // validationSchema={validationSchemas[step - 1]}
            onSubmit={handleSubmit}
          >
            {({ validateForm, setTouched, values, submitForm }) => (
              <Form className="text-black max-w-2xl mx-auto">
                <div className="border p-4 rounded-2xl">{renderStep(step)}</div>

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
        <div className="bg-yellow-100">یقثبییبلیبل</div>
      </div>
    </div>
  );
}
