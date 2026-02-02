"use client";

import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();
  const { mounted } = useAuth();
  const [clientMounted, setClientMounted] = useState(false);

  useEffect(() => {
    setClientMounted(true);
  }, []);

  const isAuthPage = pathname === "/login" || pathname === "/forgot-password";

  // Wait for both client mount and auth mount
  if (!clientMounted || !mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {isAuthPage ? (
        <div className="min-h-screen bg-background flex items-center justify-center">
          {children}
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <aside className="hidden lg:block w-64 flex-shrink-0 fixed inset-y-0 left-0 z-30">
            <Sidebar isMobile={false} />
          </aside>

          <div className="flex flex-col flex-1 w-full lg:ml-64 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto bg-background">
              <div className="p-4 sm:p-6 lg:p-8 w-full">{children}</div>
            </main>
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </ThemeProvider>
  );
}