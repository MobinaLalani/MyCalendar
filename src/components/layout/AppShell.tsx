"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((current) => !current)}
        onClose={() => setIsSidebarOpen(false)}
      />

      <motion.main
        initial={false}
        animate={{
          marginLeft: isSidebarOpen ? 288 : 0,
          scale: isSidebarOpen ? 0.965 : 1,
          borderRadius: isSidebarOpen ? 28 : 0,
        }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        style={{ transformOrigin: "left top" }}
        className="min-h-screen bg-transparent"
      >
        {children}
      </motion.main>
    </div>
  );
}
