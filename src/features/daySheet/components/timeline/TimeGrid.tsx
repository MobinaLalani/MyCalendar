// TimeGrid.tsx
import React from "react";
import Task from "./Task";
import HourRow from "./HourRow";

interface TimeGridProps {
  children?: React.ReactNode;
  totalHoursToShow?: number;
  hourHeightPx?: number;
  startHour?: number;
}

interface TaskData {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
}

interface PositionedTask extends TaskData {
  left: number;
  width: number;
}

const generateHours = (start = 8, end = 20): string[] => {
  const hours = [];

  for (let i = start; i < end; i++) {
    hours.push(`${String(i).padStart(2, "0")}:00`);
  }

  return hours;
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const isOverlapping = (a: TaskData, b: TaskData) => {
  return (
    timeToMinutes(a.startTime) < timeToMinutes(b.endTime) &&
    timeToMinutes(a.endTime) > timeToMinutes(b.startTime)
  );
};

const calculateTaskPositions = (tasks: TaskData[]): PositionedTask[] => {
  const sortedTasks = [...tasks].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
  );

  const result: PositionedTask[] = [];

  const groups: TaskData[][] = [];

  sortedTasks.forEach((task) => {
    let addedToGroup = false;

    for (const group of groups) {
      const hasOverlap = group.some((groupTask) =>
        isOverlapping(task, groupTask),
      );

      if (hasOverlap) {
        group.push(task);
        addedToGroup = true;
        break;
      }
    }

    if (!addedToGroup) {
      groups.push([task]);
    }
  });

  groups.forEach((group) => {
    const width = 100 / group.length;

    group.forEach((task, index) => {
      result.push({
        ...task,
        width,
        left: index * width,
      });
    });
  });

  return result;
};

const TimeGrid: React.FC<TimeGridProps> = ({
  totalHoursToShow = 24,
  hourHeightPx = 60,
  startHour = 0,
}) => {
  const hours = generateHours(startHour, startHour + totalHoursToShow);

  const totalGridHeight = totalHoursToShow * hourHeightPx;

  const pixelsPerMinute = hourHeightPx / 60;

  const tasks: TaskData[] = [
    {
      id: "t1",
      title: "جلسه با تیم",
      startTime: "09:00",
      endTime: "10:30",
      color: "#f39c12",
    },
    {
      id: "t2",
      title: "توسعه فیچر جدید",
      startTime: "10:00",
      endTime: "12:00",
      color: "#2ecc71",
    },
    {
      id: "t3",
      title: "بررسی کد",
      startTime: "10:15",
      endTime: "11:30",
      color: "#9b59b6",
    },
    {
      id: "t4",
      title: "ناهار",
      startTime: "13:00",
      endTime: "14:00",
      color: "#e74c3c",
    },
    {
      id: "t5",
      title: "تسک تست",
      startTime: "10:20",
      endTime: "11:00",
      color: "#3498db",
    },
  ];

  const positionedTasks = calculateTaskPositions(tasks);

  return (
    <div
      className="relative w-full border-l border-gray-200 bg-white"
      style={{
        height: `${totalGridHeight}px`,
      }}
    >
      {/* Hour Rows */}
      {hours.map((hour) => (
        <HourRow key={hour} hour={hour} height={hourHeightPx} />
      ))}

      {/* Tasks */}
      {positionedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          startHour={startHour}
          hourHeightPx={hourHeightPx}
          pixelsPerMinute={pixelsPerMinute}
          left={task.left}
          width={task.width}
        />
      ))}
    </div>
  );
};

export default TimeGrid;
