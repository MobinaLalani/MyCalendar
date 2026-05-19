import React from "react";
// فرض می‌کنیم generateHours همچنان یک آرایه از رشته‌های ساعت برمی‌گرداند
// import { generateHours } from "../../utils/generate-hours";
import Task from "./Task";

import HourRow from "./HourRow";
interface TimeGridProps {
  children?: React.ReactNode;
  // تعداد کل ساعت‌ها برای نمایش در گرید
  totalHoursToShow?: number;
  // ارتفاع هر ساعت به پیکسل
  hourHeightPx?: number;
  // ساعت شروع گرید (مثلا 8 برای 8 صبح)
  startHour?: number;
}

// یک تابع نمونه برای generateHours اگر از قبل ندارید
const generateHours = (start = 8, end = 20): string[] => {
  const hours = [];
  for (let i = start; i < end; i++) {
    hours.push(`${i}:00`);
  }
  return hours;
};

const TimeGrid: React.FC<TimeGridProps> = ({
  children,
  totalHoursToShow = 24, // پیش‌فرض: نمایش 12 ساعت
  hourHeightPx = 40, // پیش‌فرض: هر ساعت 50 پیکسل ارتفاع دارد
  startHour = 1, // پیش‌فرض: از ساعت 8 صبح شروع می‌شود
}) => {
  // ساعت‌هایی که باید نمایش داده شوند را تولید می‌کنیم
  const hours = generateHours(startHour, startHour + totalHoursToShow);

  // محاسبه کل ارتفاع گرید بر اساس تعداد ساعت‌ها و ارتفاع هر ساعت
  const totalGridHeight = totalHoursToShow * hourHeightPx;

  // محاسبه پیکسل بر دقیقه برای استفاده در محاسبه موقعیت تسک‌ها
  const pixelsPerMinute = hourHeightPx / 60;

  // اینجا می‌توانید این مقادیر را به Context یا prop های عمیق‌تر پاس دهید
  // تا کامپوننت‌های تسک به راحتی به آن‌ها دسترسی داشته باشند.
  // برای سادگی، در اینجا فقط لاگ می‌کنیم.
  console.log(`Total Grid Height: ${totalGridHeight}px`);
  console.log(`Pixels Per Hour: ${hourHeightPx}px`);
  console.log(`Pixels Per Minute: ${pixelsPerMinute}px`);
  console.log(`Hours displayed: ${hours.join(", ")}`);
  interface TaskData {
    id: string;
    title: string;
    startTime: string; // به فرمت "HH:MM" مانند "10:30"
    endTime: string; // به فرمت "HH:MM" مانند "12:00"
    color:string
    // سایر پراپرتی‌ها
  }

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
    startTime: "11:30",
    endTime: "12:30",
    color: "#9b59b6",
  },
  {
    id: "t4",
    title: "ناهار",
    startTime: "13:00",
    endTime: "14:00",
    color: "#e74c3c",
  },
];
return (
  <div
    className="relative flex flex-col w-full border-l border-gray-200"
    style={{ height: `${totalGridHeight}px` }}
  >
    {hours.map((hour, index) => (
      <HourRow key={hour} hour={hour} height={hourHeightPx}  />
    ))}

    {/* رندر کردن تسک ها */}
    {tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        startHour={startHour}
        hourHeightPx={hourHeightPx}
        pixelsPerMinute={pixelsPerMinute}
        // اگر منطق چیدمان تسک های همپوشان را پیاده سازی کردید،
        // left و width را اینجا محاسبه و پاس دهید.
        // به عنوان مثال:
        // left={calculateTaskLeft(task, tasks, ...) }
        // width={calculateTaskWidth(task, tasks, ...)}
      />
    ))}
  </div>
);
};

export default TimeGrid;
