"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, useState } from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => new QueryClient());

  return createElement(QueryClientProvider, { client }, children);
}
