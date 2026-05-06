import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

type TooltipProps = {
  content: ReactNode; // متن یا JSX داخل Tooltip
  children: ReactNode; // المانی که Tooltip به آن چسبیده
  position?: "top" | "bottom" | "left" | "right";
  delay?: number; // تاخیر نمایش Tooltip (ms)
};

export default function Tooltip({
  content,
  children,
  position = "top",
  delay = 100,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  let positionClasses = "";
  switch (position) {
    case "top":
      positionClasses = "bottom-full mb-2 left-1/2 -translate-x-1/2";
      break;
    case "bottom":
      positionClasses = "top-full mt-2 left-1/2 -translate-x-1/2";
      break;
    case "left":
      positionClasses = "right-full mr-2 top-1/2 -translate-y-1/2";
      break;
    case "right":
      positionClasses = "left-full ml-2 top-1/2 -translate-y-1/2";
      break;
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setTimeout(() => setIsVisible(true), delay)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setTimeout(() => setIsVisible(true), delay)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 max-w-xs rounded-md bg-black/80 px-3 py-1 text-xs text-white shadow-lg ${positionClasses}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
