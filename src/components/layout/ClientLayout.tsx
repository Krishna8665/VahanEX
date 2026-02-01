"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  // Pages that should NOT show sidebar/header
  const isAuthPage = pathname === "/login" || pathname === "/forgot-password";

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {isAuthPage ? (
        children
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 fixed inset-y-0 left-0 z-30">
            <Sidebar />
          </aside>

          {/* Main content */}
          <div className="flex flex-col flex-1 w-full lg:ml-64 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto bg-background">
              <div className="p-4 sm:p-6 lg:p-8 w-full">{children}</div>
            </main>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
