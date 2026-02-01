"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = data;

      // Save token
      localStorage.setItem("token", token);

      // ✅ Set auth cookie for middleware
      document.cookie = "vahanex-auth=1; path=/; max-age=86400";

      // ✅ Show success toast
      toast.success("Login successful! Redirecting...", {
        duration: 2000,
        position: "top-center",
      });

      // ✅ Hard redirect with page reload (ensures middleware runs)
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (err: any) {
      // Show error message
      const errorMessage =
        err.response?.data?.message ||
        "Invalid email or password. Please try again.";
      
      // Set error and keep email/password intact
      setError(errorMessage);
      setLoading(false);

      // Auto-clear error after 3 seconds (WITHOUT page refresh, data stays)
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoFocus
          className="h-12"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="h-12"
        />
      </div>

      {/* ✅ Error message - Shows for 3 seconds then auto-hides */}
      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 dark:bg-red-950/30 px-3 py-2 text-sm text-red-600 dark:text-red-400 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}