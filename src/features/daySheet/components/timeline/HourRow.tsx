import React from "react";

interface HourRowProps {
  hour: string;
  height: number;
}

const HourRow: React.FC<HourRowProps> = ({ hour, height }) => {
  return (
    <div
      className="relative flex items-center w-full border-b border-gray-200"
      style={{
        minHeight: `${height}px`,
        height: `${height}px`,
      }}
    >
      <span className="absolute -left-12 top-1 text-gray-400 text-sm w-10 text-right">
        {hour}
      </span>

      <div
        className="absolute inset-x-0 border-b border-gray-200"
        style={{ top: "50%" }}
      />
    </div>
  );
};

export default HourRow;
