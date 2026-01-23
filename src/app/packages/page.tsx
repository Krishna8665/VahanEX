// src/app/packages/page.tsx
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
  Bike as Scooter,
  Plus,
  Eye,
  Edit,
  Trash2,
  CreditCard,
  Clock,
  Calendar,
} from "lucide-react";

// Dummy data – matches your HTML exactly
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

const packages = [
  { days: "1 Day", training: 1, hours: 2, price: "NPR 2,000" },
  { days: "3 Days", training: 3, hours: 6, price: "NPR 5,500" },
  { days: "1 Week", training: 7, hours: 14, price: "NPR 12,000" },
  { days: "1 Month", training: 30, hours: 60, price: "NPR 40,000" },
  { days: "2 Months", training: 60, hours: 120, price: "NPR 75,000" },
];

export default function PackagesPage() {
  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Driving Packages & Payments
        </h1>
        <p className="text-muted-foreground">
          Manage packages and track payment records
        </p>
      </div>

      {/* Vehicle Type Selector */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle>Select Vehicle Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              className="h-20 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md"
            >
              <Car className="mr-3 h-6 w-6" />
              Car
            </Button>
            <Button variant="outline" className="h-20">
              <Bike className="mr-3 h-6 w-6" />
              Motorcycle
            </Button>
            <Button variant="outline" className="h-20">
              <Scooter className="mr-3 h-6 w-6" />
              Scooter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Car Packages */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle>Car Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-6 text-center hover:shadow-md transition-all duration-200"
              >
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{pkg.days}</h3>
                <div className="space-y-1.5 mb-5 text-sm text-muted-foreground">
                  <p><strong>{pkg.training}</strong> Training Days</p>
                  <p><strong>{pkg.hours}</strong> Total Hours</p>
                </div>
                <p className="text-3xl font-bold text-primary mb-5">{pkg.price}</p>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">
                  Select Package
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Records + Summary */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Payment Records Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle>Payment Records</CardTitle>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Payment
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Vehicle Type</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Paid Amount</TableHead>
                      <TableHead>Remaining Balance</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right w-28">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyPayments.map((payment, i) => (
                      <TableRow key={i} className="hover:bg-muted/50 transition-colors">
                        <TableCell>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                            {payment.initial}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{payment.name}</TableCell>
                        <TableCell>{payment.package}</TableCell>
                        <TableCell>{payment.vehicle}</TableCell>
                        <TableCell className="font-medium">{payment.total}</TableCell>
                        <TableCell className="text-green-600 font-medium">{payment.paid}</TableCell>
                        <TableCell className="text-red-600 font-medium">{payment.remaining}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={payment.status === "Paid" ? "success" : "secondary"}
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
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

        {/* Right: Summary Cards */}
        <div className="space-y-6">
          <Card className="border-border bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold mt-1">NPR 6,45,000</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <CreditCard className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                  <p className="text-3xl font-bold mt-1">NPR 1,65,000</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <Clock className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold mt-1">NPR 1,25,000</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}