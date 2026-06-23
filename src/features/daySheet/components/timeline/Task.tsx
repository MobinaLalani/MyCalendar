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
    if (!timeStr || !timeStr.includes(":")) {
      return 0;
    }

    const [hours, minutes] = timeStr.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return 0;
    }

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
      className="absolute px-2 py-1.5 text-white text-xs rounded-xl overflow-hidden shadow-lg"
      style={{
        top: `${topPosition}px`,
        left: `${left}%`,
        width: `calc(${width}% - 6px)`,
        height: `${taskHeight}px`,
        backgroundColor: `${color || "#3498db"}cc`,
        borderLeft: `3px solid ${color || "#3498db"}`,
        zIndex: 10,
      }}
    >
      <div className="font-semibold truncate leading-tight">{title}</div>
      {taskHeight > 24 && (
        <div className="opacity-70 text-[10px] mt-0.5">
          {startTime} – {endTime}
        </div>
      )}
    </div>
  );
};

export default Task;
