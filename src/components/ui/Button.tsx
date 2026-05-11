import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const baseClassName =
    "flex-1 rounded-2xl bg-[] border border-black px-3 py-3 text-sm font-semibold text-slate-950 transition";

  return (
    <button type={type} className={`${baseClassName} ${className}`} {...props}>
      {children}
    </button>
  );
}
