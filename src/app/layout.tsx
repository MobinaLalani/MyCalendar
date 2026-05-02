import "../styles/globals.css";
import Providers from "../lib/react-query";
import type { Metadata } from "next";

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
    <html lang="fa" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
