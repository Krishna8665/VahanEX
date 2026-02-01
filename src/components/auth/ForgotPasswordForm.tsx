// src/app/forgot-password/page.tsx
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white font-bold text-2xl mb-4">
            V
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        <ForgotPasswordForm />

        <div className="mt-6 text-center text-sm">
          <a
            href="/login"
            className="text-teal-600 dark:text-teal-400 hover:underline"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}