"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = theme === "dark";
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Get the main scroll container
    const mainElement = document.querySelector("main");
    
    const handleScroll = () => {
      if (mainElement) {
        setIsScrolled(mainElement.scrollTop > 10);
      }
    };

    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll, { passive: true });
      return () => mainElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
        isScrolled
          ? "bg-white/10 dark:bg-gray-900/10 backdrop-blur-3xl shadow-none border-transparent"
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-gray-200/40 dark:border-gray-800/40"
      }`}
    >
      <div className="flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile sidebar trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:h-11 sm:w-11 hover:bg-gray-200/30 dark:hover:bg-gray-700/30"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Toggle navigation menu</span>
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
            className="text-xl sm:text-2xl font-bold tracking-tight text-primary hover:text-primary/80 transition-colors lg:hidden"
          >
            VahanEX
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Theme toggle button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-11 sm:w-11 relative hover:bg-gray-200/30 dark:hover:bg-gray-700/30"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun
              className={`h-5 w-5 sm:h-6 sm:w-6 transition-all absolute ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"}`}
            />
            <Moon
              className={`h-5 w-5 sm:h-6 sm:w-6 transition-all absolute ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}