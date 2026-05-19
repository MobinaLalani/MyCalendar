import React from "react";

interface TaskData {
  id: string;
  title: string;
  startTime: string; // به فرمت "HH:MM" مانند "10:30"
  endTime: string; // به فرمت "HH:MM" مانند "12:00"
  color?: string; // برای رنگ بندی اختیاری
}

interface TaskProps {
  task: TaskData;
  startHour: number;
  hourHeightPx: number;
  pixelsPerMinute: number;
  // برای مدیریت تسک های همپوشان (اختیاری)
  left?: number;
  width?: number;
}

const Task: React.FC<TaskProps> = ({
  task,
  startHour,
  hourHeightPx,
  pixelsPerMinute,
  left = 0, // موقعیت افقی پیش فرض
  width = "100%", // عرض پیش فرض
}) => {
  const { title, startTime, endTime, color } = task;

  // تابع کمکی برای تبدیل زمان "HH:MM" به دقیقه کل از midnight
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // محاسبه کل دقایق از midnight برای زمان شروع و پایان تسک
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  // محاسبه کل دقایق از midnight برای ساعت شروع گرید
  // این محاسبه به ما کمک می کند موقعیت تسک را نسبت به شروع گرید تنظیم کنیم
  const gridStartMinutes = startHour * 60;

  // محاسبه موقعیت عمودی (top) تسک
  // 1. دقیقه تسک نسبت به شروع گرید: startMinutes - gridStartMinutes
  // 2. تبدیل این دقایق به پیکسل با ضرب در pixelsPerMinute
  const topPosition = (startMinutes - gridStartMinutes) * pixelsPerMinute;

  // محاسبه ارتفاع (height) تسک بر حسب پیکسل
  const durationMinutes = endMinutes - startMinutes;
  const taskHeight = durationMinutes * pixelsPerMinute;

  // اطمینان از اینکه ارتفاع تسک صفر یا منفی نباشد
  const finalTaskHeight = Math.max(taskHeight, 1); // حداقل ۱ پیکسل ارتفاع

  // محاسبه موقعیت افقی (left) و عرض (width) اگر نیاز باشد
  // فرض میکنیم این مقادیر به صورت props پاس داده شده اند
  // اگر نه، می توانید اینجا منطق چیدمان تسک های همپوشان را پیاده سازی کنید

  // استایل برای نمایش تسک
  const taskStyle: React.CSSProperties = {
    position: "absolute",
    top: `${topPosition}px`,
    height: `${finalTaskHeight}px`,
    left: `${typeof left === "number" ? left : 0}px`, // اگر left عددی بود از آن استفاده کن
    width: typeof width === "string" ? width : `${width}px`, // اگر width رشته بود (مانند '100%') از آن استفاده کن
    backgroundColor: color || "#3498db", // رنگ پیش فرض آبی
    color: "white",
    borderRadius: "4px",
    padding: "5px",
    boxSizing: "border-box", // برای اینکه padding و border داخل عرض و ارتفاع حساب شوند
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    zIndex: 1, // برای اطمینان از دیده شدن روی خطوط گرید
  };

  return (
    <div
      className="task-item"
      style={taskStyle}
      title={`${title} (${startTime} - ${endTime})`} // نمایش زمان در hover
    >
      <span className="truncate">{title}</span>
      {/* می توانید زمان را هم نمایش دهید اگر جا باشد */}
      {/* <span className="ml-auto text-xs opacity-70">
        {startTime} - {endTime}
      </span> */}
    </div>
  );
};

export default Task;
