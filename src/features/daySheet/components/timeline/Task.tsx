// Task.tsx
import React from "react";

interface TaskData {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
}

interface TaskProps {
  task: TaskData;
  startHour: number;
  hourHeightPx: number;
  pixelsPerMinute: number;
  left?: number;
  width?: number;
}

const Task: React.FC<TaskProps> = ({
  task,
  startHour,
  pixelsPerMinute,
  left = 0,
  width = 100,
}) => {
  const { title, startTime, endTime, color } = task;

  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);

    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(startTime);

  const endMinutes = timeToMinutes(endTime);

  const gridStartMinutes = startHour * 60;

  const topPosition = (startMinutes - gridStartMinutes) * pixelsPerMinute;

  const durationMinutes = endMinutes - startMinutes;

  const taskHeight = durationMinutes * pixelsPerMinute;

  return (
    <div
      className="absolute px-2 py-1 text-white text-xs rounded-md overflow-hidden shadow-md"
      style={{
        top: `${topPosition}px`,
        left: `${left}%`,
        width: `calc(${width}% - 4px)`,
        height: `${taskHeight}px`,
        backgroundColor: color || "#3498db",
        zIndex: 10,
      }}
    >
      <div className="font-medium truncate">{title}</div>

      <div className="opacity-80 text-[10px]">
        {startTime} - {endTime}
      </div>
    </div>
  );
};

export default Task;
