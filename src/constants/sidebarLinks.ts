import {
  HomeIcon,
  CalendarIcon,
  BarChart3Icon,
  Settings2Icon,
  CalendarDaysIcon,
} from "lucide-react";

export const SidebarLinks = [
  {
    href: "/habits",
    label: "عادت ها",
    description: "ثبت عادت جدید",
    icon: HomeIcon,
  },
  {
    href: "/calender",
    label: "تقویم",
    description: "برنامه‌ریزی روزها",
    icon: CalendarIcon,
  },
  {
    href: "/week",
    label: "هفته",
    description: "نمای هفتگی",
    icon: CalendarDaysIcon,
  },
  {
    href: "/reports",
    label: "گزارش‌ها",
    description: "نمودارها و آمار",
    icon: BarChart3Icon,
  },
  {
    href: "/settings",
    label: "تنظیمات",
    description: "پیکربندی برنامه",
    icon: Settings2Icon,
  },
];
