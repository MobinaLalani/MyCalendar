import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`
          w-full rounded-2xl border text-black px-4 py-3 text-sm 
          outline-none transition
          ${error ? "border-red-500" : "border-gray-700"}
          ${className}
        `}
      />
    );
  },
);

Input.displayName = "Input";
