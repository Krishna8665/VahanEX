"use client";

import { Toaster } from "react-hot-toast";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Toaster position="top-center" />
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="w-full max-w-sm px-4">
          {/* Logo Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white font-bold text-2xl sm:text-4xl shadow-lg mb-3 sm:mb-4">
              V
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              VahanEX
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 mt-2">
              Driving Institute Management
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-6 sm:mt-8">
            © {new Date().getFullYear()} VahanEX. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}