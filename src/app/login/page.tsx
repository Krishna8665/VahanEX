// src/app/login/page.tsx
"use client";

import { Toaster } from "react-hot-toast";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white font-bold text-4xl shadow-lg mb-4">
              V
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              VahanEX
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Driving Institute Management
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            © {new Date().getFullYear()} VahanEX. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}