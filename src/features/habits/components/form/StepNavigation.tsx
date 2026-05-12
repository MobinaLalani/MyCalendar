"use client";

type Props = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isLastStep?: boolean;
};

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isLastStep,
}: Props) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={currentStep === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span>
        Step {currentStep} / {totalSteps}
      </span>

      <button
        type="button"
        onClick={onNext}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isLastStep ? "Submit" : "Next"}
      </button>
    </div>
  );
}
