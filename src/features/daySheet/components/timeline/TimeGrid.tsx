import React from "react";
import { generateHours } from "../../utils/generate-hours";
import HourRow from "./HourRow";

interface TimeGridProps {
  children?: React.ReactNode;
}

const TimeGrid: React.FC<TimeGridProps> = ({ children }) => {
  const hours = generateHours();

  return (
    <div className="relative flex flex-col w-full border-l border-gray-200">
      {hours.map((hour) => (
        <HourRow key={hour} hour={hour} />
      ))}
      {children}
    </div>
  );
};

export default TimeGrid;
