// HourRow.tsx
import React from "react";

interface HourRowProps {
  hour: string;
  height: number;
}

const HourRow: React.FC<HourRowProps> = ({ hour, height }) => {
  return (
    <div
      className="relative w-full border-b border-gray-200"
      style={{
        height: `${height}px`,
      }}
    >
      {/* Hour Label */}
      <span className="absolute -left-14 top-0 text-xs text-gray-500">
        {hour}
      </span>

      {/* Half Hour Line */}
      <div
        className="absolute left-0 right-0 border-b border-dashed border-gray-100"
        style={{
          top: "50%",
        }}
      />
    </div>
  );
};

export default HourRow;
