// src/types/index.ts

export interface Session {
  student: string;
  vehicle: string;
  time: string;
  instructor: string;
  status: "Ongoing" | "Upcoming" | "Completed" | string;
}

export interface ExpiryItem {
  name: string;
  package: string;
  days: number;
}

export interface StatItem {
  title: string;
  value: string;
}
