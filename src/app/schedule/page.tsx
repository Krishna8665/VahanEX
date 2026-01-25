// src/app/schedule/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Plus,
  Trash2,
  Car,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";

// Dummy data for today's schedule (you can replace with real data)
const dummySessions = [
  {
    initial: "R",
    name: "Ramesh Thapa",
    time: "09:00 - 11:00",
    vehicle: "BA-1-PA-1234",
    instructor: "Bikash Gurung",
    status: "Scheduled",
  },
  {
    initial: "S",
    name: "Sita Sharma",
    time: "10:30 - 12:30",
    vehicle: "BA-1-PA-5678",
    instructor: "Deepak Rai",
    status: "In Progress",
  },
  {
    initial: "A",
    name: "Anil Poudel",
    time: "11:00 - 13:00",
    vehicle: "BA-1-PA-9012",
    instructor: "Suresh Tamang",
    status: "Scheduled",
  },
  {
    initial: "S",
    name: "Sunita Adhikari",
    time: "14:00 - 16:00",
    vehicle: "BA-1-PA-3456",
    instructor: "Bikash Gurung",
    status: "Scheduled",
  },
];

const stats = [
  {
    title: "Total Sessions",
    value: "6",
    color: "from-teal-400 to-teal-600",
    icon: Calendar,
  },
  {
    title: "Today's Sessions",
    value: "4",
    color: "from-blue-400 to-blue-600",
    icon: Calendar,
  },
  {
    title: "In Progress",
    value: "1",
    color: "from-orange-400 to-orange-600",
    icon: Clock,
  },
  {
    title: "Completed",
    value: "0",
    color: "from-green-400 to-green-600",
    icon: CheckCircle,
  },
];

export default function SchedulePage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            Schedule Management
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
            Manage driving sessions and prevent time conflicts
          </p>
        </div>
        <Button className="gap-2 whitespace-nowrap shadow-sm w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base">
          <Plus className="h-4 w-4" />
          <span className="sm:inline">Schedule Session</span>
        </Button>
      </div>

      {/* Date Picker + Legend */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <label
              htmlFor="date-picker"
              className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap"
            >
              Select Date:
            </label>
            <input
              id="date-picker"
              type="date"
              defaultValue="2025-04-10"
              className="px-3 py-2 border border-input rounded-md bg-background text-xs sm:text-sm focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Scheduled
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                In Progress
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Completed
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b pb-3 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
            Sessions for 2025-04-10
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            {dummySessions.map((session, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-4 sm:p-5 hover:shadow-md transition-all bg-card"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Time Slot */}
                  <div className="flex items-center gap-4 min-w-[120px]">
                    <div className="text-center">
                      <p className="text-xs sm:text-sm font-semibold text-foreground">
                        {session.time.split(" - ")[0]}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        to
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground">
                        {session.time.split(" - ")[1]}
                      </p>
                    </div>
                    <div className="w-1 h-16 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1">
                        Student
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {session.initial}
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                          {session.name}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1">
                        Vehicle
                      </p>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-foreground truncate">
                          {session.vehicle}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1">
                        Instructor
                      </p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-foreground truncate">
                          {session.instructor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status + Delete */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Badge
                      variant={
                        session.status === "Confirmed"
                          ? "default"
                          : session.status === "In Progress"
                            ? "default"
                            : "secondary"
                      }
                      className="text-[10px] sm:text-xs"
                    >
                      {session.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="bg-card rounded-xl shadow-sm border-border hover:shadow-md transition-all"
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
