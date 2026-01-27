"use client";

import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useTheme } from "next-themes";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur shadow-sm">
      <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile menu trigger - opens Sheet with Sidebar (single close button inside Sidebar) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] sm:w-72 p-0 border-r overflow-hidden flex flex-col"
              onInteractOutside={() => setOpen(false)}
              hideCloseButton
            >
              <Sidebar onClose={() => setOpen(false)} isMobile />
            </SheetContent>
          </Sheet>

          {/* Logo - visible on mobile when sidebar is closed; desktop shows Sidebar instead */}
          <Link
            href="/dashboard"
            className="lg:hidden text-lg sm:text-xl font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <img
              src="https://public.readdy.ai/ai/img_res/5d95f71b-3628-469e-9603-6f2b7c9d4d63.png"
              alt="VahanEX"
              className="h-8 w-auto object-contain"
            />
            <span>VahanEX</span>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 absolute transition-all rotate-0 scale-100 dark:scale-0 dark:rotate-90" />
            <Moon className="h-4 w-4 sm:h-5 sm:w-5 absolute transition-all scale-0 -rotate-90 dark:scale-100 dark:rotate-0" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10" aria-label="Notifications">
            <i className="ri-notification-3-line text-lg sm:text-xl" aria-hidden />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 hidden sm:flex" aria-label="Settings">
            <i className="ri-settings-3-line text-lg sm:text-xl" aria-hidden />
          </Button>
        </div>
      </div>
    </header>
  );
}
