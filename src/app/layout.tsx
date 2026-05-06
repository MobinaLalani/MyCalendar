import "../styles/globals.css";
import localFont from "next/font/local";
import AppShell from "../components/layout/AppShell";
import Providers from "../lib/react-query";
import type { Metadata } from "next";

const yekanBakh = localFont({
  src: [
    {
      path: "../../public/fonts/YekanBakhFaNum-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-yekan-bakh",
  display: "swap",
});

export const metadata: Metadata = {
  title: "تقویم فارسی من",
  description: "تقویم شمسی فارسی برای برنامه ریزی روزانه و ثبت تسک ها",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={yekanBakh.variable}>
      <body className={yekanBakh.className}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
