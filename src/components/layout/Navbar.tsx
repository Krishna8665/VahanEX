//src/components/layout/Navbar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
      <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile sidebar trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 sm:w-72 p-0 border-none"
              onInteractOutside={() => setOpen(false)}
            >
              <Sidebar onClose={() => setOpen(false)} isMobile={true} />
            </SheetContent>
          </Sheet>

          {/* Logo/Brand - visible on mobile */}
          <Link
            href="/dashboard"
            className="text-lg sm:text-xl font-bold tracking-tight text-primary hover:text-primary/80 transition-colors lg:hidden"
          >
            VahanEX
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun
              className={`h-4 w-4 sm:h-5 sm:w-5 transition-all ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"}`}
            />
            <Moon
              className={`absolute h-4 w-4 sm:h-5 sm:w-5 transition-all ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
