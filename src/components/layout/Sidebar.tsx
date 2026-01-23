"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
        "flex flex-col h-full w-full"
      )}
    >
      {/* Header with logo */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <img
            src="https://public.readdy.ai/ai/img_res/5d95f71b-3628-469e-9603-6f2b7c9d4d63.png"
            alt="VahanEX Logo"
            className="h-8 sm:h-10 w-auto object-contain"
          />
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block"
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg transition-all text-left",
                    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive &&
                      "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-md"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base truncate">
                    {item.name}
                  </span>
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
            <span className="text-sm sm:text-base">A</span>
          </div>
          <div className="min-w-0 flex-1">
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