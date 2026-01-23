// src/data/mockDashboardData.ts
import { Session, ExpiryItem, StatItem } from "@/types";

export const stats: StatItem[] = [
  { title: "Total Students", value: "156" },
  { title: "Active Students", value: "89" },
  { title: "Total Vehicles", value: "24" },
  { title: "Today's Sessions", value: "12" },
  { title: "Total Revenue", value: "₹485,000" },
  { title: "Pending Payments", value: "₹125,000" },
];

export const sessions: Session[] = [
  {
    student: "Rajesh Sharma",
    vehicle: "Maruti Swift",
    time: "10:00 AM",
    instructor: "Anil Kumar",
    status: "Ongoing",
  },
  {
    student: "Priya Thapa",
    vehicle: "Hyundai i20",
    time: "11:30 AM",
    instructor: "Sita Rai",
    status: "Upcoming",
  },
  {
    student: "Suman Gurung",
    vehicle: "Honda City",
    time: "02:00 PM",
    instructor: "Anil Kumar",
    status: "Completed",
  },
  {
    student: "Aarav Patel",
    vehicle: "Toyota Innova",
    time: "04:30 PM",
    instructor: "Sita Rai",
    status: "Upcoming",
  },
  // add more as you want
];

export const packageExpiries: ExpiryItem[] = [
  { name: "Aarav Patel", package: "Basic 10 Hours", days: 3 },
  { name: "Sneha Joshi", package: "Premium 20 Hours", days: 7 },
  { name: "Rohan KC", package: "Advance 30 Hours", days: 12 },
  { name: "Meera Shrestha", package: "Basic 10 Hours", days: 1 },
];
