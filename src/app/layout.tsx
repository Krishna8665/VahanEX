import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";
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
            <aside className="hidden lg:block w-64 flex-shrink-0 fixed inset-y-0 left-0 z-30">
              <Sidebar isMobile={false} />
            </aside>

            {/* Main content column */}
            <div className="flex flex-col flex-1 w-full lg:ml-64 overflow-hidden">
              {/* Navbar */}
              <Navbar />

              {/* Scrollable main content */}
              <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
                <div className="p-4 sm:p-6 lg:p-8 w-full">{children}</div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
