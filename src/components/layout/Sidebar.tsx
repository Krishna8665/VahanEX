// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Car,
  Settings,
  CreditCard,
  UserCog,
  X,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/students", icon: Users },
  { name: "Packages & Payments", href: "/packages", icon: CreditCard },
  { name: "Vehicles", href: "/vehicles", icon: Car },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Instructors", href: "/instructors", icon: UserCog },
  { name: "Admin Controls", href: "/admin", icon: Settings },
];

export default function Sidebar({ onClose, isMobile = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-white dark:bg-gray-900 shadow-xl",
        "flex flex-col h-full w-full",
      )}
    >
      {/* Header with logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <img
            src="https://public.readdy.ai/ai/img_res/5d95f71b-3628-469e-9603-6f2b7c9d4d63.png"
            alt="VahanEX Logo"
            className="h-10 w-auto object-contain"
          />
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap",
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  <Icon className="text-xl w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// src/components/layout/Navbar.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import { Moon, Sun, Menu } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {Sidebar} from "./Sidebar";
// import Link from "next/link";
// import { useState } from "react";

// export function Navbar() {
//   const { theme, setTheme } = useTheme();
//   const [open, setOpen] = useState(false);
//   const isDark = theme === "dark";

//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
//       <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
//         {/* Left side */}
//         <div className="flex items-center gap-2 sm:gap-4">
//           {/* Mobile sidebar trigger */}
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild className="lg:hidden">
//               <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
//                 <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent
//               side="left"
//               className="w-64 sm:w-72 p-0 border-none"
//               onInteractOutside={() => setOpen(false)}
//             >
//               <Sidebar onClose={() => setOpen(false)} isMobile={true} />
//             </SheetContent>
//           </Sheet>

//           {/* Logo/Brand - visible on mobile */}
//           <Link
//             href="/dashboard"
//             className="text-lg sm:text-xl font-bold tracking-tight text-primary hover:text-primary/80 transition-colors lg:hidden"
//           >
//             VahanEX
//           </Link>
//         </div>

//         {/* Right side */}
//         <div className="flex items-center gap-1 sm:gap-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-9 w-9 sm:h-10 sm:w-10"
//             onClick={() => setTheme(isDark ? "light" : "dark")}
//             aria-label="Toggle theme"
//           >
//             <Sun className={`h-4 w-4 sm:h-5 sm:w-5 transition-all ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
//             <Moon className={`absolute h-4 w-4 sm:h-5 sm:w-5 transition-all ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }

// src/app/layout.tsx
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import { Navbar } from "@/components/layout/Navbar";
// import Sidebar from "@/components/layout/Sidebar";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: {
//     default: "VahanEX - Admin Panel",
//     template: "%s | VahanEX",
//   },
//   description: "Driving Institute Management Dashboard",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationOnChange>
//       <body
//         className={`
//           ${inter.variable}
//           font-sans
//           antialiased
//           bg-background
//           text-foreground
//         `}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <div className="flex h-screen overflow-hidden">
//             {/* Fixed Sidebar – Desktop only */}
//             <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0">
//               <div className="fixed inset-y-0 left-0 w-64 overflow-y-auto">
//                 <Sidebar isMobile={false} />
//               </div>
//             </div>

//             {/* Main content column */}
//             <div className="flex flex-col flex-1 w-full lg:w-auto overflow-hidden">
//               {/* Navbar */}
//               <Navbar />

//               {/* Scrollable main content */}
//               <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
//                 <div className="p-4 sm:p-6 lg:p-8">
//                   {children}
//                 </div>
//               </main>
//             </div>
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
