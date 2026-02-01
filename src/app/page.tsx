// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Root URL (/) ALWAYS redirects to login
  redirect("/login");
}