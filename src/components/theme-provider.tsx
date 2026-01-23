// src/components/theme-provider.tsx
// "use client";

// import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { type ThemeProviderProps } from "next-themes";

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return (
//     <NextThemesProvider
//       {...props}
//       attribute="class" // adds .dark class to html
//       defaultTheme="system" // system / light / dark
//       enableSystem // respects OS preference
//       disableTransitionOnChange // smoother switch (optional)
//     >
//       {children}
//     </NextThemesProvider>
//   );
// }
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}