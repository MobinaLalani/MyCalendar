// hooks/useToggle.ts
import { useState } from "react";

export function useToggle(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return { isOpen, toggle, close, open };
}
