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

// Dummy data for today's schedule
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
    <div className="space-y-3 md:space-y-4 p-3 md:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-0.5">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Schedule Management
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Manage driving sessions and prevent time conflicts
          </p>
        </div>
        <Button className="gap-2 whitespace-nowrap shadow-sm w-full sm:w-auto h-9 text-sm">
          <Plus className="h-4 w-4" />
          <span>Schedule Session</span>
        </Button>
      </div>

      {/* Date Picker + Legend */}
      <Card className="border shadow-sm">
        <CardContent className="p-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="date-picker"
              className="text-xs font-medium text-foreground whitespace-nowrap"
            >
              Select Date:
            </label>
            <input
              id="date-picker"
              type="date"
              defaultValue="2025-04-10"
              className="px-2 py-1.5 border border-input rounded-md bg-background text-xs focus:ring-2 focus:ring-ring focus:border-ring w-full sm:w-auto"
            />
          </div>

          <div className="hidden sm:block flex-1" />

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs text-muted-foreground">Scheduled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-xs text-muted-foreground">In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <Card className="border shadow-sm">
        <CardHeader className="border-b pb-2.5 px-3 md:px-4">
          <CardTitle className="text-base md:text-lg font-bold text-foreground">
            Sessions for 2025-04-10
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-3 md:p-4">
            {dummySessions.map((session, i) => (
              <div
                key={i}
                className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-all bg-card"
              >
                {/* Mobile Layout - Horizontal Time Bar */}
                <div className="flex md:hidden flex-col gap-3">
                  {/* Time Slot - Horizontal */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                        {session.time.split(" - ")[0]}
                      </p>
                      <div className="h-1 flex-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" />
                      <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                        {session.time.split(" - ")[1]}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:bg-red-100 dark:hover:bg-red-900/30 flex-shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Details - Mobile */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground mb-1">
                        Student
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {session.initial}
                        </div>
                        <p className="text-xs font-medium text-foreground truncate">
                          {session.name}
                        </p>
                        <Badge
                          variant={
                            session.status === "Confirmed"
                              ? "default"
                              : session.status === "In Progress"
                                ? "default"
                                : "secondary"
                          }
                          className="text-[10px] ml-auto"
                        >
                          {session.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">
                          Vehicle
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Car className="h-3.5 w-3.5 text-teal-600 flex-shrink-0" />
                          <p className="text-xs text-foreground truncate">
                            {session.vehicle}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">
                          Instructor
                        </p>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-teal-600 flex-shrink-0" />
                          <p className="text-xs text-foreground truncate">
                            {session.instructor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tablet & Desktop Layout - Vertical Time Bar */}
                <div className="hidden md:flex md:items-center gap-4">
                  {/* Time Slot - Vertical */}
                  <div className="flex items-center gap-3 min-w-[110px]">
                    <div className="text-center">
                      <p className="text-xs font-semibold text-foreground">
                        {session.time.split(" - ")[0]}
                      </p>
                      <p className="text-[10px] text-muted-foreground">to</p>
                      <p className="text-xs font-semibold text-foreground">
                        {session.time.split(" - ")[1]}
                      </p>
                    </div>
                    <div className="w-1 h-14 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full flex-shrink-0" />
                  </div>

                  {/* Details - Desktop */}
                  <div className="flex-1 grid grid-cols-3 gap-3 lg:gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-muted-foreground mb-1">
                        Student
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {session.initial}
                        </div>
                        <p className="text-xs font-medium text-foreground truncate">
                          {session.name}
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-muted-foreground mb-1">
                        Vehicle
                      </p>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-teal-600 flex-shrink-0" />
                        <p className="text-xs text-foreground truncate">
                          {session.vehicle}
                        </p>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-muted-foreground mb-1">
                        Instructor
                      </p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-teal-600 flex-shrink-0" />
                        <p className="text-xs text-foreground truncate">
                          {session.instructor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status + Delete - Desktop */}
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        session.status === "Confirmed"
                          ? "default"
                          : session.status === "In Progress"
                            ? "default"
                            : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {session.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:bg-red-100 dark:hover:bg-red-900/30 flex-shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="bg-card rounded-xl shadow-sm border hover:shadow-md transition-all"
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-xl font-bold text-foreground mt-1">
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
