"use client";

import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CartContextProvider } from "@/contexts/cart-context/cart-context";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </CartContextProvider>
    </>
  );
}
