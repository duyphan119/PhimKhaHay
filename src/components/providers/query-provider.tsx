"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

type QueryProviderProps = {
  children: React.ReactNode;
};

const client = new QueryClient();

export default function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
