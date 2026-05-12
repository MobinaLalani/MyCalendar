"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MainLayout from "./mainLayout";
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
          marginRight: isSidebarOpen ? 288 : 0,
          scale: isSidebarOpen ? 0.965 : 1,
          borderRadius: isSidebarOpen ? 28 : 0,
        }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        style={{ transformOrigin: "right top" }}
        className="min-h-screen bg-transparent"
      >
        <MainLayout>{children}</MainLayout>
      </motion.main>
    </div>
  );
}
