// import CheckIcon from "@/src/components/icons/checkIcon.svg";

type TaskColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

const TASK_COLORS = [
  "#F87171", // red
  "#FB923C", // orange
  "#FACC15", // yellow
  "#4ADE80", // green
  "#2DD4BF", // teal
  "#60A5FA", // blue
  "#818CF8", // indigo
  "#C084FC", // purple
  "#F472B6", // pink
];

export default function TaskColorPicker({
  value,
  onChange,
}: TaskColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {TASK_COLORS.map((color) => {
        const isSelected = value === color;

        return (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            aria-label={`Select color ${color}`}
            className={`
              relative flex h-10 w-10 items-center justify-center
              rounded-full border border-black/5
              transition-all duration-200
              hover:scale-110
              active:scale-95
              ${
                isSelected
                  ? "scale-110 ring-4 ring-black/10"
                  : "opacity-90 hover:opacity-100"
              }
            `}
            style={{
              backgroundColor: color,
            }}
          >
            {isSelected ? (
              <span className="flex items-center justify-center text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
