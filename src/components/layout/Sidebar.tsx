"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
        animate={{ x: isOpen ? 0 : -240 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="fixed left-0 top-0 z-40 h-screen w-72 flex-col border-r border-white/10 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-2xl"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="sidebar-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                <div>
                  <div className="text-xs text-white/50">برنامه ریزی</div>
                  <h2 className="mt-1 text-lg font-semibold">MyCalendar</h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition hover:bg-white/10"
                  aria-label="بستن سایدبار"
                >
                  ×
                </button>
              </div>

              {/* Active Section */}
              <div className="border-b border-white/10 px-5 py-4">
                <div className="text-xs text-white/50">بخش فعال</div>
                <div className="mt-2 rounded-2xl bg-white/5 px-3 py-3 text-sm">
                  {activeLabel}
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2 px-4 py-4">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-2xl border px-4 py-3 transition ${
                        isActive
                          ? "border-cyan-400/30 bg-cyan-400/12 text-cyan-100"
                          : "border-white/5 bg-white/[0.03] text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="text-sm font-medium">{link.label}</div>
                      <div className="mt-1 text-xs text-white/50">
                        {link.description}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="border-t border-white/10 px-5 py-4">
                <div className="rounded-2xl bg-white/5 px-4 py-4 text-sm leading-6 text-white/70">
                  از این سایدبار می توانی بین بخش های اصلی جابه جا شوی و هر زمان
                  خواستی آن را جمع کنی.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* Toggle Button */}
      <motion.button
        type="button"
        initial={false}
        animate={{ left: isOpen ? 272 : 16 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        onClick={onToggle}
        className="fixed top-5 z-50 inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-[var(--sidebar)] px-4 text-sm font-medium text-white shadow-lg transition hover:bg-[#151515]"
        aria-label={isOpen ? "جمع کردن سایدبار" : "باز کردن سایدبار"}
      >
        <span>{isOpen ? "بستن" : "منو"}</span>
      </motion.button>
    </>
  );
}
