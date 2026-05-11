type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm text-(--text-foreground)"
      >
        {label}
      </label>

      {children}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
