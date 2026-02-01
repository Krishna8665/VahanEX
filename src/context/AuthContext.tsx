// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync with cookie on mount
  useEffect(() => {
    if (!mounted) return;

    const checkAuth = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("vahanex-auth="));
      setIsAuthenticated(!!cookie);
    };

    checkAuth();
    // Listen for cookie changes when tab regains focus
    window.addEventListener("focus", checkAuth);
    return () => window.removeEventListener("focus", checkAuth);
  }, [mounted]);

  const login = () => {
    document.cookie = "vahanex-auth=1; path=/; max-age=86400"; // 1 day
    setIsAuthenticated(true);
  };

  const logout = () => {
    document.cookie = "vahanex-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}