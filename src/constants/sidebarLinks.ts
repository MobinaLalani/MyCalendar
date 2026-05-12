import {
  HomeIcon,
  CalendarIcon,
  Settings2Icon,
  BarChart3Icon,
} from "lucide-react";

export const SidebarLinks = [
  {
    href: "/habits",
    label: "عادت ها",
    description: "ثبت عادت جدید",
    icon: HomeIcon,
  },
  {
    href: "/calendar",
    label: "تقویم",
    description: "برنامه‌ریزی روزها",
    icon: CalendarIcon,
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
