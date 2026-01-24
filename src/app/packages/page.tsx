"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Bike,
  Lightbulb,
  Plus,
  Eye,
  Edit,
  CreditCard,
  Clock,
  Calendar,
} from "lucide-react";
import { useState } from "react";

// Dummy data
const dummyPayments = [
  {
    initial: "R",
    name: "Ramesh Thapa",
    package: "1 Month",
    vehicle: "Car",
    icon: Car,
    total: "NPR 40,000",
    paid: "NPR 40,000",
    remaining: "NPR 0",
    date: "2024-01-15",
    status: "Paid",
  },
  {
    initial: "S",
    name: "Sita Sharma",
    package: "1 Month",
    vehicle: "Car",
    icon: Car,
    total: "NPR 40,000",
    paid: "NPR 20,000",
    remaining: "NPR 20,000",
    date: "2024-01-20",
    status: "Partial",
  },
  {
    initial: "A",
    name: "Anil Poudel",
    package: "1 Week",
    vehicle: "Motorcycle",
    icon: Bike,
    total: "NPR 7,000",
    paid: "NPR 7,000",
    remaining: "NPR 0",
    date: "2024-02-01",
    status: "Paid",
  },
  {
    initial: "S",
    name: "Sunita Adhikari",
    package: "2 Months",
    vehicle: "Car",
    icon: Car,
    total: "NPR 75,000",
    paid: "NPR 50,000",
    remaining: "NPR 25,000",
    date: "2024-01-10",
    status: "Partial",
  },
  {
    initial: "K",
    name: "Krishna Karki",
    package: "3 Days",
    vehicle: "Scooter",
    icon: Lightbulb,
    total: "NPR 2,800",
    paid: "NPR 1,500",
    remaining: "NPR 1,300",
    date: "2024-02-05",
    status: "Partial",
  },
];

const packages = [
  { days: "1 Day", training: 1, hours: 2, price: "NPR 2,000" },
  { days: "3 Days", training: 3, hours: 6, price: "NPR 5,500" },
  { days: "1 Week", training: 7, hours: 14, price: "NPR 12,000" },
  { days: "1 Month", training: 30, hours: 60, price: "NPR 40,000" },
  { days: "2 Months", training: 60, hours: 120, price: "NPR 75,000" },
];

const vehicleTypes = [
  { name: "Car", icon: Car, active: true },
  { name: "Motorcycle", icon: Bike, active: false },
  { name: "Scooter", icon: Lightbulb, active: false },
];

export default function PackagesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState("Car");

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Driving Packages & Payments
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage packages and track payment records
        </p>
      </div>

      {/* Vehicle Type Selector */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">Select Vehicle Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {vehicleTypes.map((vehicle) => {
              const VehicleIcon = vehicle.icon;
              return (
                <Button
                  key={vehicle.name}
                  onClick={() => setSelectedVehicle(vehicle.name)}
                  className={`h-20 sm:h-24 flex flex-col items-center justify-center gap-2 transition-all ${
                    selectedVehicle === vehicle.name
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg scale-105"
                      : "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                  }`}
                >
                  <VehicleIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                  <span className="text-base sm:text-lg font-semibold">{vehicle.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Car Packages */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">{selectedVehicle} Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4 text-center hover:shadow-md hover:border-primary/50 transition-all duration-200"
              >
                <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-bold mb-2">{pkg.days}</h3>
                <div className="space-y-1 mb-3 text-xs text-muted-foreground">
                  <p className="font-medium">{pkg.training} Days</p>
                  <p>{pkg.hours} Hours</p>
                </div>
                <p className="text-base font-bold text-primary mb-3">{pkg.price}</p>
                <Button
                  size="sm"
                  className="w-full text-xs bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards - Horizontal with balanced spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/30 dark:to-green-950/20 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl md:text-3xl font-bold mt-2 text-green-600 dark:text-green-400">NPR 6,45,000</p>
              </div>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <CreditCard className="h-7 w-7 md:h-8 md:w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-orange-50 to-orange-50/50 dark:from-orange-950/30 dark:to-orange-950/20 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium text-muted-foreground">Pending Payments</p>
                <p className="text-2xl md:text-3xl font-bold mt-2 text-orange-600 dark:text-orange-400">NPR 1,65,000</p>
              </div>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <Clock className="h-7 w-7 md:h-8 md:w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-teal-50 to-teal-50/50 dark:from-teal-950/30 dark:to-teal-950/20 shadow-sm sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl md:text-3xl font-bold mt-2 text-teal-600 dark:text-teal-400">NPR 1,25,000</p>
              </div>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <Calendar className="h-7 w-7 md:h-8 md:w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Records Table */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <CardTitle className="text-lg md:text-xl">Payment Records</CardTitle>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Payment</span>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-muted/30 hover:bg-muted/30">
                <TableHead className="px-4 py-3 w-12">#</TableHead>
                <TableHead className="px-4 py-3 min-w-32">Student Name</TableHead>
                <TableHead className="px-4 py-3 min-w-28">Package</TableHead>
                <TableHead className="px-4 py-3 min-w-28">Vehicle</TableHead>
                <TableHead className="px-4 py-3 min-w-28 text-right">Total</TableHead>
                <TableHead className="px-4 py-3 min-w-28 text-right">Paid</TableHead>
                <TableHead className="px-4 py-3 min-w-28 text-right">Remaining</TableHead>
                <TableHead className="px-4 py-3 min-w-24">Date</TableHead>
                <TableHead className="px-4 py-3 min-w-20">Status</TableHead>
                <TableHead className="px-4 py-3 text-right w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyPayments.map((payment, i) => {
                const VehicleIcon = payment.icon;
                return (
                  <TableRow key={i} className="hover:bg-muted/50 transition-colors border-b">
                    <TableCell className="px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {payment.initial}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 font-semibold text-foreground">{payment.name}</TableCell>
                    <TableCell className="px-4 py-3 text-muted-foreground">{payment.package}</TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <VehicleIcon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-foreground">{payment.vehicle}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 font-semibold text-right text-foreground">{payment.total}</TableCell>
                    <TableCell className="px-4 py-3 text-right font-semibold text-green-600 dark:text-green-400">{payment.paid}</TableCell>
                    <TableCell className="px-4 py-3 text-right font-semibold text-red-600 dark:text-red-400">{payment.remaining}</TableCell>
                    <TableCell className="px-4 py-3 text-xs text-muted-foreground">{payment.date}</TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant={payment.status === "Paid" ? "success" : "secondary"}
                        className="text-xs"
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-teal-100 dark:hover:bg-teal-900/30"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-teal-100 dark:hover:bg-teal-900/30"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}