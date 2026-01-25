import { Card, CardContent } from "@/components/ui/card";
import { Car, CheckCircle, Wrench } from "lucide-react";
import type { ComponentType } from "react";

interface StatCardProps {
  title: string;
  value: string;
}

interface IconConfig {
  icon: ComponentType<{ className?: string }>;
  gradient: string;
  iconColor: string;
}

const statIconConfig: Record<string, IconConfig> = {
  "Total Vehicles": {
    icon: Car,
    gradient: "bg-gradient-to-br from-violet-500 to-violet-600",
    iconColor: "text-white",
  },
  Available: {
    icon: CheckCircle,
    gradient: "bg-gradient-to-br from-green-500 to-green-600",
    iconColor: "text-white",
  },
  "In Use": {
    icon: Car,
    gradient: "bg-gradient-to-br from-amber-500 to-amber-600",
    iconColor: "text-white",
  },
  Maintenance: {
    icon: Wrench,
    gradient: "bg-gradient-to-br from-red-500 to-red-600",
    iconColor: "text-white",
  },
};

export function StatCard({ title, value }: StatCardProps) {
  const config = statIconConfig[title] || {
    icon: Car,
    gradient: "bg-gradient-to-br from-slate-500 to-slate-600",
    iconColor: "text-white",
  };
  const Icon = config.icon;

  return (
    <Card className="bg-card rounded-xl shadow-sm border-border hover:shadow-md transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-card-foreground mt-2">
              {value}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.gradient}`}
          >
            <Icon className={`h-5 w-5 ${config.iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
