// src/app/admin/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Database, FileText, Users, Lock, Car } from "lucide-react";
import { GrBike } from "react-icons/gr";
import { GiScooter } from "react-icons/gi";

export default function AdminPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          Admin Controls
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
          Manage system settings and configurations
        </p>
      </div>

      {/* Institute Settings */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b pb-3 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
            Institute Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
              Institute Name
            </label>
            <Input
              defaultValue="VahanEX Driving School"
              className="bg-background text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                defaultValue="admin@vahanex.com"
                className="bg-background text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                Phone
              </label>
              <Input
                type="tel"
                defaultValue="+977 61-123456"
                className="bg-background text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
              Address
            </label>
            <Textarea
              defaultValue="Lakeside, Pokhara-6, Kaski, Nepal"
              rows={3}
              className="bg-background resize-none text-xs sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <Button className="gap-2 whitespace-nowrap shadow-sm h-9 sm:h-10 text-xs sm:text-sm">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Package Pricing Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Car Package Pricing */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="border-b pb-3 sm:pb-4 px-4 sm:px-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
              <Car className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
              Car Package Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {[
                { label: "1 Day Package", value: "2000" },
                { label: "3 Days Package", value: "5500" },
                { label: "1 Week Package", value: "12000" },
                { label: "1 Month Package", value: "40000" },
                { label: "2 Months Package", value: "75000" },
              ].map((pkg, i) => (
                <div key={i}>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                    {pkg.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs sm:text-sm">
                      NPR
                    </span>
                    <Input
                      type="number"
                      defaultValue={pkg.value}
                      className="pl-10 sm:pl-14 bg-background text-xs sm:text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4 sm:mt-6">
              <Button className="gap-2 whitespace-nowrap shadow-sm h-9 sm:h-10 text-xs sm:text-sm">
                Update Car Pricing
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Motorcycle Package Pricing */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="border-b pb-3 sm:pb-4 px-4 sm:px-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
              <GrBike className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
              Motorcycle Package Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {[
                { label: "1 Day Package", value: "1200" },
                { label: "3 Days Package", value: "3200" },
                { label: "1 Week Package", value: "7000" },
                { label: "1 Month Package", value: "25000" },
                { label: "2 Months Package", value: "45000" },
              ].map((pkg, i) => (
                <div key={i}>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                    {pkg.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs sm:text-sm">
                      NPR
                    </span>
                    <Input
                      type="number"
                      defaultValue={pkg.value}
                      className="pl-10 sm:pl-14 bg-background text-xs sm:text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4 sm:mt-6">
              <Button className="gap-2 whitespace-nowrap shadow-sm h-9 sm:h-10 text-xs sm:text-sm">
                Update Motorcycle Pricing
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scooter Package Pricing */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="border-b pb-3 sm:pb-4 px-4 sm:px-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
              <GiScooter className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
              Scooter Package Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {[
                { label: "1 Day Package", value: "1000" },
                { label: "3 Days Package", value: "2800" },
                { label: "1 Week Package", value: "6000" },
                { label: "1 Month Package", value: "22000" },
                { label: "2 Months Package", value: "40000" },
              ].map((pkg, i) => (
                <div key={i}>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                    {pkg.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs sm:text-sm">
                      NPR
                    </span>
                    <Input
                      type="number"
                      defaultValue={pkg.value}
                      className="pl-10 sm:pl-14 bg-background text-xs sm:text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4 sm:mt-6">
              <Button className="gap-2 whitespace-nowrap shadow-sm h-9 sm:h-10 text-xs sm:text-sm">
                Update Scooter Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Admin Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            title: "Backup Data",
            desc: "Create system backup",
            icon: Database,
            color: "from-teal-400 to-teal-600",
          },
          {
            title: "Generate Report",
            desc: "Export analytics",
            icon: FileText,
            color: "from-blue-400 to-blue-600",
          },
          {
            title: "User Roles",
            desc: "Manage permissions",
            icon: Users,
            color: "from-purple-400 to-purple-600",
          },
          {
            title: "Change Password",
            desc: "Update credentials",
            icon: Lock,
            color: "from-orange-400 to-orange-600",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-card rounded-xl shadow-sm border-border hover:shadow-md transition-all cursor-pointer"
          >
            <CardContent className="p-4 sm:p-6">
              <div
                className={`w-10 h-10 flex items-center justify-center bg-gradient-to-br ${item.color} rounded-lg mb-3 sm:mb-4`}
              >
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* System Information */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b pb-3 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                Version
              </p>
              <p className="text-base sm:text-lg font-bold text-foreground">
                v1.0.0
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                Last Backup
              </p>
              <p className="text-base sm:text-lg font-bold text-foreground">
                2025-02-14
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                Database Status
              </p>
              <Badge variant="default" className="text-xs">
                Connected
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
