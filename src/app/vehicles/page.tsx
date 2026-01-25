import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StatCard } from "@/components/vehicle/StatCard";
import { VehicleCard } from "@/components/vehicle/VehicleCard";

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

const Index = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            Vehicle Management
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
            Manage all vehicles and their availability
          </p>
        </div>
        <Button className="gap-2 whitespace-nowrap shadow-sm w-full sm:w-auto sm:min-w-[160px] px-6 h-10 sm:h-11 text-sm sm:text-base">
          <Plus className="h-4 w-4" />
          <span className="sm:inline">Add Vehicle</span>
        </Button>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Vehicle Cards - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {dummyVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.plate} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Index;
