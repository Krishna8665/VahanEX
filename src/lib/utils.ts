// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Session } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Maps session status to badge variant
 */
export function getStatusVariant(status: Session["status"]): "default" | "secondary" | "success" | "outline" {
  const lower = status.toLowerCase()
  switch (lower) {
    case "ongoing":
      return "default"
    case "upcoming":
      return "secondary"
    case "completed":
      return "success"
    default:
      return "outline"
  }
}

/**
 * Format currency (simple version)
 */
export function formatCurrency(amount: string | number): string {
  return `₹${Number(amount).toLocaleString("en-IN")}`
}