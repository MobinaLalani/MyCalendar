import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
  // می‌تونید پراپ‌های دیگه‌ای هم اینجا اضافه کنید، مثلاً عنوان صفحه، یا کامپوننت هدر/فوتر
  // header?: React.ReactNode;
  // footer?: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen p-4 ">
      {" "}
      {/* padding دور صفحه */}
      {/* اینجا می‌تونید هدر یا کامپوننت‌های دیگه رو اضافه کنید */}
      {/* {header} */}
      <main className="flex-grow">
        {" "}
        {/* main فضای خالی رو پر می‌کنه */}
        {children}
      </main>
      {/* اینجا می‌تونید فوتر یا کامپوننت‌های دیگه رو اضافه کنید */}
      {/* {footer} */}
    </div>
  );
}
