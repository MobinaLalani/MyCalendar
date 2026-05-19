type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function Textarea({ error, className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`
        w-full rounded-2xl border px-4 py-3 text-black text-sm
        outline-none transition
        ${error ? "border-red-500" : "border-gray-700"}
        ${className}
      `}
    />
  );
}
