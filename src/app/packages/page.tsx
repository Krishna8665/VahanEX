"use client";

import { useState } from "react";
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
  Plus,
  Eye,
  Edit,
  CreditCard,
  Clock,
  Calendar,
} from "lucide-react";
import { GrBike } from "react-icons/gr";
import { GiScooter } from "react-icons/gi";


const dummyPayments = [
  {
    initial: "R",
    name: "Ramesh Thapa",
    package: "1 Month",
    vehicle: "Car",
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
    total: "NPR 2,800",
    paid: "NPR 1,500",
    remaining: "NPR 1,300",
    date: "2024-02-05",
    status: "Partial",
  },
];

// Dynamic packages per vehicle type
const packagesByVehicle = {
  Car: [
    { days: "1 Day", training: 1, hours: 2, price: "NPR 2,000" },
    { days: "3 Days", training: 3, hours: 6, price: "NPR 5,500" },
    { days: "1 Week", training: 7, hours: 14, price: "NPR 12,000" },
    { days: "1 Month", training: 30, hours: 60, price: "NPR 40,000" },
    { days: "2 Months", training: 60, hours: 120, price: "NPR 75,000" },
  ],
  Motorcycle: [
    { days: "1 Day", training: 1, hours: 1.5, price: "NPR 1,200" },
    { days: "3 Days", training: 3, hours: 4.5, price: "NPR 3,200" },
    { days: "1 Week", training: 7, hours: 10.5, price: "NPR 7,000" },
    { days: "1 Month", training: 30, hours: 45, price: "NPR 25,000" },
    { days: "2 Months", training: 60, hours: 90, price: "NPR 45,000" },
  ],
  Scooter: [
    { days: "1 Day", training: 1, hours: 1, price: "NPR 800" },
    { days: "3 Days", training: 3, hours: 3, price: "NPR 2,200" },
    { days: "1 Week", training: 7, hours: 7, price: "NPR 4,500" },
    { days: "1 Month", training: 30, hours: 30, price: "NPR 15,000" },
    { days: "2 Months", training: 60, hours: 60, price: "NPR 28,000" },
  ],
};

const vehicleTypes = [
  { name: "Car", icon: Car, color: "teal" },
  { name: "Motorcycle", icon: GrBike, color: "orange" },
  { name: "Scooter", icon: GiScooter, color: "green" },
] as const;

type VehicleType = (typeof vehicleTypes)[number]["name"];

interface PackageItem {
  days: string;
  training: number;
  hours: number;
  price: string;
}

export default function PackagesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>("Car");

  const activeColor =
    vehicleTypes.find((v) => v.name === selectedVehicle)?.color || "teal";

  const gradientFrom =
    activeColor === "teal"
      ? "from-teal-500"
      : activeColor === "orange"
        ? "from-orange-500"
        : "from-green-500";

  const gradientTo =
    activeColor === "teal"
      ? "to-teal-600"
      : activeColor === "orange"
        ? "to-orange-600"
        : "to-green-600";

  // Lighter gradient for package card icon circle
  const iconGradient =
    activeColor === "teal"
      ? "from-teal-400 to-teal-600"
      : activeColor === "orange"
        ? "from-orange-400 to-orange-600"
        : "from-green-400 to-green-600";

  // Select button gradient + hover (for package cards)
  const btnGradient =
    activeColor === "teal"
      ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
      : activeColor === "orange"
        ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700";

  const packages: PackageItem[] = packagesByVehicle[selectedVehicle] ?? [];

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Driving Packages & Payments
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Choose your vehicle type and explore available packages
        </p>
      </div>

      {/* Select Vehicle Type - card */}
      <Card className="rounded-xl shadow-sm border border-gray-100 dark:border-border bg-white dark:bg-card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-foreground mb-4">
          Select Vehicle Type
        </h2>
        <div className="flex gap-4">
          {vehicleTypes.map((vehicle) => {
            const Icon = vehicle.icon;
            const isActive = selectedVehicle === vehicle.name;
            return (
              <Button
                key={vehicle.name}
                onClick={() => setSelectedVehicle(vehicle.name)}
                className={`
                  flex-1 px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3
                  ${
                    isActive
                      ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-lg`
                      : "bg-gray-100 dark:bg-muted text-gray-700 dark:text-muted-foreground hover:bg-gray-200 dark:hover:bg-muted/80"
                  }
                `}
              >
                <Icon className="text-2xl shrink-0" />
                <span>{vehicle.name}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Dynamic Packages for Selected Vehicle */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">
            {selectedVehicle} Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {packages.map((pkg: PackageItem, i: number) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4 text-center hover:shadow-md hover:border-primary/50 transition-all duration-200"
              >
                <div
                  className={`mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-br ${iconGradient} flex items-center justify-center`}
                >
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-bold mb-2">{pkg.days}</h3>
                <div className="space-y-1 mb-3 text-xs text-muted-foreground">
                  <p className="font-medium">{pkg.training} Days</p>
                  <p>{pkg.hours} Hours</p>
                </div>
                <p className="text-base font-bold text-primary mb-3">
                  {pkg.price}
                </p>
                <Button
                  size="sm"
                  className={`w-full text-xs text-white ${btnGradient}`}
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Records Table */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <CardTitle className="text-lg md:text-xl">Payment Records</CardTitle>
          <Button
            size="sm"
            className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Payment</span>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-muted/30 hover:bg-muted/30">
                  <TableHead className="px-4 py-3 w-12">#</TableHead>
                  <TableHead className="px-4 py-3 min-w-32">
                    Student Name
                  </TableHead>
                  <TableHead className="px-4 py-3 min-w-28">Package</TableHead>
                  <TableHead className="px-4 py-3 min-w-28">Vehicle</TableHead>
                  <TableHead className="px-4 py-3 min-w-28 text-right">
                    Total
                  </TableHead>
                  <TableHead className="px-4 py-3 min-w-28 text-right">
                    Paid
                  </TableHead>
                  <TableHead className="px-4 py-3 min-w-28 text-right">
                    Remaining
                  </TableHead>
                  <TableHead className="px-4 py-3 min-w-24">Date</TableHead>
                  <TableHead className="px-4 py-3 min-w-20">Status</TableHead>
                  <TableHead className="px-4 py-3 text-right w-20">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyPayments.map((payment, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-muted/50 transition-colors border-b"
                  >
                    <TableCell className="px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {payment.initial}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 font-semibold text-foreground">
                      {payment.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-muted-foreground">
                      {payment.package}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {payment.vehicle === "Car" && (
                          <Car className="h-4 w-4 text-teal-600" />
                        )}
                        {payment.vehicle === "Motorcycle" && (
                          <GrBike className="h-4 w-4 text-orange-600" />
                        )}
                        {payment.vehicle === "Scooter" && (
                          <GiScooter className="h-4 w-4 text-green-600" />
                        )}
                        <span className="text-foreground">
                          {payment.vehicle}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 font-semibold text-right text-foreground">
                      {payment.total}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right font-semibold text-green-600 dark:text-green-400">
                      {payment.paid}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right font-semibold text-red-600 dark:text-red-400">
                      {payment.remaining}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-xs text-muted-foreground">
                      {payment.date}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant={
                          payment.status === "Paid" ? "success" : "secondary"
                        }
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
