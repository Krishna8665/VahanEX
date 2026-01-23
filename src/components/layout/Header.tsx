// src/components/layout/Header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              {/* You can reuse Sidebar here or make a mobile version */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary">VahanEX</h2>
              </div>
              {/* Add mobile nav links */}
            </SheetContent>
          </Sheet>

          {/* Logo on mobile */}
          <img
            src="https://public.readdy.ai/ai/img_res/5d95f71b-3628-469e-9603-6f2b7c9d4d63.png"
            alt="VahanEX Logo"
            className="h-10 w-auto object-contain lg:hidden"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <i className="ri-notification-3-line text-xl"></i>
          </Button>
          <Button variant="ghost" size="icon">
            <i className="ri-settings-3-line text-xl"></i>
          </Button>
        </div>
      </div>
    </header>
  );
}