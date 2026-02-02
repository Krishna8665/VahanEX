"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();

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

      const { token, data: user } = data;

      login(token, user);

      toast.success("Login successful! Redirecting...", {
        duration: 2000,
        position: "top-center",
      });

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Invalid email or password. Please try again.";

      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);

      setTimeout(() => setError(null), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 w-full">
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="email" className="text-sm sm:text-base">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoFocus
          className="h-10 sm:h-11 text-sm sm:text-base"
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="password" className="text-sm sm:text-base">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="h-10 sm:h-11 text-sm sm:text-base"
        />
      </div>

      {error && (
        <div className="flex items-start sm:items-center gap-2 rounded-md bg-red-50 dark:bg-red-950/30 px-3 py-2.5 sm:py-3 text-xs sm:text-sm text-red-600 dark:text-red-400 animate-in fade-in">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-10 sm:h-11 text-sm sm:text-base font-medium bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Signing in…</span>
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}