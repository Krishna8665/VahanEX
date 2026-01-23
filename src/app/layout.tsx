// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VahanEX - Admin Panel",
    template: "%s | VahanEX",
  },
  description: "Driving Institute Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          font-sans
          antialiased
          bg-background
          text-foreground
        `}
      >
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Fixed Sidebar – Desktop only */}
            <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0">
              <div className="fixed inset-y-0 left-0 w-64 overflow-y-auto">
                <Sidebar isMobile={false} />
              </div>
            </div>

            {/* Main content column */}
            <div className="flex flex-col flex-1 w-full lg:w-auto overflow-hidden">
              {/* Navbar */}
              <Navbar />

              {/* Scrollable main content */}
              <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
                <div className="p-4 sm:p-6 lg:p-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}