// src/app/vehicles/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Plus, Calendar, CheckCircle, Wrench } from "lucide-react";
import { GrBike } from "react-icons/gr";
import { GiScooter } from "react-icons/gi";

// Dummy data
const dummyVehicles = [
  {
    plate: "BA-1-PA-1234",
    type: "Car",
    status: "Available",
    lastService: "2025-01-10",
  },
  {
    plate: "BA-2-KA-5678",
    type: "Car",
    status: "In Use",
    lastService: "2024-12-20",
  },
  {
    plate: "BA-3-JA-9012",
    type: "Car",
    status: "Maintenance",
    lastService: "2025-03-05",
  },
  {
    plate: "BA-4-LA-3456",
    type: "Bike",
    status: "Available",
    lastService: "2025-02-15",
  },
  {
    plate: "BA-5-MA-7890",
    type: "Scooter",
    status: "In Use",
    lastService: "2025-01-25",
  },
  {
    plate: "BA-6-NA-2345",
    type: "Car",
    status: "Available",
    lastService: "2025-02-28",
  },
];

const stats = [
  { title: "Total Vehicles", value: "6" },
  { title: "Available", value: "3" },
  { title: "In Use", value: "2" },
  { title: "Maintenance", value: "1" },
];

// Icon + color config
const vehicleIconConfig: Record<string, { icon: any; color: string }> = {
  Car: { icon: Car, color: "from-teal-400 to-teal-600" },
  Bike: { icon: GrBike, color: "from-teal-400 to-teal-600" },
  Scooter: { icon: GiScooter, color: "from-teal-400 to-teal-600" },
};

const statIconConfig: Record<string, { icon: any; color: string }> = {
  "Total Vehicles": { icon: Car, color: "from-purple-400 to-purple-600" },
  Available: { icon: CheckCircle, color: "from-green-400 to-green-600" },
  "In Use": { icon: Car, color: "from-orange-400 to-orange-600" },
  Maintenance: { icon: Wrench, color: "from-red-400 to-red-600" },
};

export default function VehiclesPage() {
  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Vehicle Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage all vehicles and their availability
          </p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => {
          const config = statIconConfig[stat.title] || {
            icon: Car,
            color: "from-gray-400 to-gray-600",
          };
          const Icon = config.icon;

          return (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${config.color}`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyVehicles.map((vehicle, i) => {
          const config = vehicleIconConfig[vehicle.type] || {
            icon: Car,
            color: "from-teal-400 to-teal-600",
          };
          const VehicleIcon = config.icon;

          return (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${config.color}`}
                >
                  <VehicleIcon className="h-7 w-7 text-white" />
                </div>
                <Badge
                  variant={
                    vehicle.status === "Available"
                      ? "success"
                      : vehicle.status === "In Use"
                        ? "default"
                        : "destructive"
                  }
                >
                  {vehicle.status}
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {vehicle.plate}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Type: <span className="font-medium">{vehicle.type}</span>
              </p>

              <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Last Service: {vehicle.lastService}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
