// src/app/instructors/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Plus,
  Phone,
  Mail,
  Car,
  CheckCircle,
  Clock,
} from "lucide-react";

// Dummy data (realistic Nepali instructors)
const dummyInstructors = [
  {
    initial: "B",
    name: "Bikash Gurung",
    experience: "8 years experience",
    phone: "+977 984-1234567",
    email: "bikash.gurung@vahanex.com",
    vehicles: "Car",
    assignedStudents: "12",
    status: "Active",
  },
  {
    initial: "D",
    name: "Deepak Rai",
    experience: "6 years experience",
    phone: "+977 985-2345678",
    email: "deepak.rai@vahanex.com",
    vehicles: "Car, Bike",
    assignedStudents: "10",
    status: "Active",
  },
  {
    initial: "S",
    name: "Suresh Tamang",
    experience: "10 years experience",
    phone: "+977 986-3456789",
    email: "suresh.tamang@vahanex.com",
    vehicles: "Car",
    assignedStudents: "15",
    status: "Active",
  },
  {
    initial: "R",
    name: "Rajan Shrestha",
    experience: "5 years experience",
    phone: "+977 987-4567890",
    email: "rajan.shrestha@vahanex.com",
    vehicles: "Bike, Scooter",
    assignedStudents: "8",
    status: "Active",
  },
  {
    initial: "S",
    name: "Santosh Magar",
    experience: "7 years experience",
    phone: "+977 988-5678901",
    email: "santosh.magar@vahanex.com",
    vehicles: "Car",
    assignedStudents: "0",
    status: "On Leave",
  },
];

const stats = [
  { title: "Total Instructors", value: "5", icon: Users, color: "from-teal-400 to-teal-600" },
  { title: "Active", value: "4", icon: CheckCircle, color: "from-green-400 to-green-600" },
  { title: "On Leave", value: "1", icon: Clock, color: "from-orange-400 to-orange-600" },
  { title: "Total Students", value: "45", icon: Users, color: "from-blue-400 to-blue-600" },
];

export default function InstructorsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            Instructor Management
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
            Manage all instructors and their assignments
          </p>
        </div>
        <Button className="gap-2 whitespace-nowrap shadow-sm w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base">
          <Plus className="h-4 w-4" />
          <span className="sm:inline">Add Instructor</span>
        </Button>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="bg-card rounded-xl shadow-sm border-border hover:shadow-md transition-all"
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Instructor Cards - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {dummyInstructors.map((instructor, index) => (
          <Card
            key={index}
            className="bg-card rounded-xl shadow-sm border-border p-4 sm:p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {instructor.initial}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground">
                    {instructor.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {instructor.experience}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  instructor.status === "Active" ? "success" : "secondary"
                }
                className="text-[10px] sm:text-xs"
              >
                {instructor.status}
              </Badge>
            </div>

            <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">{instructor.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">{instructor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">{instructor.vehicles}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>
                  {instructor.assignedStudents} assigned students
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 sm:h-9 text-xs sm:text-sm"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 sm:h-9 text-xs sm:text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}