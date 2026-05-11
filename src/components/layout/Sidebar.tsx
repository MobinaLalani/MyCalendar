"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SidebarLinks } from "@/src/constants/sidebarLinks";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const sidebarLinks = [
  { href: "/", label: "خانه", description: "نمای کلی پروژه" },
  { href: "/calender", label: "تقویم", description: "برنامه ریزی روزها" },
];

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname();

  const activeLabel = useMemo(
    () =>
      sidebarLinks.find((link) => link.href === pathname)?.label ?? "ناوبری",
    [pathname],
  );

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : 240 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="fixed right-0 top-0 z-40 h-screen w-72 flex-col border-l border-white/10 rounded-l-3xl bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-2xl"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="sidebar-content"
              dir="rtl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col pt-14"
            >
              {SidebarLinks.map(({ href, label, description, icon: Icon }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link key={href} href={href} className="relative block">
  
                    <div className="relative flex items-center gap-3 px-4 py-3">
                      <Icon className="h-5 w-5 text-cyan-300/80" />
                      <div>
                        <div className="text-sm font-medium">{label}</div>
                        <div className="mt-1 text-xs text-white/50">
                          {description}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      <motion.button
        type="button"
        initial={false}
        animate={{ right: isOpen ? 250 : 16 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        onClick={onToggle}
        className={`fixed top-5 z-50 inline-flex h-11 items-center gap-2 rounded-full border bg-amber-300 px-4 text-sm font-medium  ${isOpen ? "text-(--text-foreground)" : "text-white"} transition hover:bg-[#151515] hover:text-white`}
      >
        <span>{isOpen ? "بستن" : "منو"}</span>
      </motion.button>

      {/* Toggle Button */}
    </>
  );
}
