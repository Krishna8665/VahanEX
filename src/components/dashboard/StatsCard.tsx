// src/components/dashboard/StatsCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { StatItem } from "@/types";
import {
  Users,
  UserCheck,
  Car,
  CalendarCheck,
  IndianRupee,
  Clock,
  Wrench,
  CheckCircle,
} from "lucide-react";
import { GrBike } from "react-icons/gr";
import { GiScooter } from "react-icons/gi";

// Icon + gradient color mapping
const statConfig: Record<string, { icon: any; color: string }> = {
  "Total Students": { icon: Users, color: "from-blue-400 to-blue-600" },
  "Active Students": { icon: UserCheck, color: "from-green-400 to-green-600" },
  "Total Vehicles": { icon: Car, color: "from-purple-400 to-purple-600" },
  "Today's Sessions": { icon: CalendarCheck, color: "from-orange-400 to-orange-600" },
  "Total Revenue": { icon: IndianRupee, color: "from-teal-400 to-teal-600" },
  "Pending Payments": { icon: Clock, color: "from-red-400 to-red-600" },

  // Vehicle-specific
  Available: { icon: CheckCircle, color: "from-green-400 to-green-600" },
  "In Use": { icon: Car, color: "from-orange-400 to-orange-600" },
  Maintenance: { icon: Wrench, color: "from-red-400 to-red-600" },
  Car: { icon: Car, color: "from-purple-400 to-purple-600" },
  Bike: { icon: GrBike, color: "from-blue-400 to-blue-600" },
  Motorcycle: { icon: GrBike, color: "from-blue-400 to-blue-600" },
  Scooter: { icon: GiScooter, color: "from-yellow-400 to-yellow-600" },

  // fallback
  default: { icon: Users, color: "from-gray-400 to-gray-600" },
};

interface StatsCardProps {
  stat: StatItem;
}

export function StatsCard({ stat }: StatsCardProps) {
  const config = statConfig[stat.title] || statConfig.default;
  const Icon = config.icon;

  return (
    <Card className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden h-full">
      <CardContent className="p-3.5 sm:p-4 flex items-center justify-between gap-3 h-full">
        {/* Left: Title + Value */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate leading-none">
            {stat.title}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-0.5 leading-none truncate">
            {stat.value}
          </p>
        </div>

        {/* Right: Gradient circle icon */}
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${config.color} shadow-sm group-hover:shadow-md transition-shadow shrink-0`}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      </CardContent>
    </Card>
  );
}