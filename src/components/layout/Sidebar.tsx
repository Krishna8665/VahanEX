// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Car,
  Settings,
  CreditCard,
  UserCog,
  X,
  LogOut,
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
  const handleLogout = () => {
    localStorage.clear();

    document.cookie =
      "vahanex-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    window.location.replace("/login");
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full w-full",
        "bg-card border-r border-border shadow-sm",
      )}
    >
      {/* Header with logo and close button (mobile only) */}
      <div className="p-4 sm:p-6 border-b border-border shrink-0">
        <div className="flex items-center justify-between gap-2">
          <img
            src="https://public.readdy.ai/ai/img_res/5d95f71b-3628-469e-9603-6f2b7c9d4d63.png"
            alt="VahanEX Logo"
            className="h-9 w-auto object-contain sm:h-10"
          />
          {isMobile && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors touch-manipulation"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 sm:py-6 px-3 sm:px-4">
        <ul className="space-y-1 sm:space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg transition-all whitespace-nowrap text-sm sm:text-base",
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile + Logout */}
      <div className="p-3 sm:p-4 border-t border-border shrink-0">
        <div className="flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold shrink-0 text-sm">
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Administrator
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
