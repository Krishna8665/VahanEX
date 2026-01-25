import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Car } from "lucide-react";
import { GrBike } from "react-icons/gr";
import { GiScooter } from "react-icons/gi";
import type { ComponentType } from "react";

interface Vehicle {
  plate: string;
  type: string;
  status: string;
  lastService: string;
}

interface IconConfig {
  icon: ComponentType<{ className?: string }>;
  gradient: string;
}

const vehicleIconConfig: Record<string, IconConfig> = {
  Car: { icon: Car, gradient: "bg-gradient-to-br from-primary to-primary/80" },
  Bike: { icon: GrBike, gradient: "bg-gradient-to-br from-primary to-primary/80" },
  Scooter: { icon: GiScooter, gradient: "bg-gradient-to-br from-primary to-primary/80" },
};

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const config = vehicleIconConfig[vehicle.type] || {
    icon: Car,
    gradient: "bg-gradient-to-br from-primary to-primary/80",
  };
  const VehicleIcon = config.icon;

  const statusVariant = 
    vehicle.status === "Available" ? "success" :
    vehicle.status === "In Use" ? "default" : "destructive";

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${config.gradient}`}>
          <VehicleIcon className="h-6 w-6 text-primary-foreground" />
        </div>
        <Badge variant={statusVariant} className="text-xs">
          {vehicle.status}
        </Badge>
      </div>

      <h3 className="text-lg font-bold text-card-foreground mb-1.5">
        {vehicle.plate}
      </h3>

      <p className="text-xs text-muted-foreground mb-3">
        Type: <span className="font-medium text-foreground">{vehicle.type}</span>
      </p>

      <div className="space-y-1.5 mb-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last Service: {vehicle.lastService}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
