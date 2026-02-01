"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Car, Loader2, Edit2, Trash2 } from "lucide-react";
import { GrBike } from "react-icons/gr";
import { GiScooter } from "react-icons/gi";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface Vehicle {
  id: string;
  vehicleNumber: string;
  model: string;
  type: string;
  status: string;
  createdAt: string;
}

const vehicleIconConfig: Record<string, { icon: any; color: string }> = {
  car: { icon: Car, color: "from-teal-400 to-teal-600" },
  bike: { icon: GrBike, color: "from-blue-400 to-blue-600" },
  scooter: { icon: GiScooter, color: "from-yellow-400 to-yellow-600" },
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const initialFormData = {
    vehicleNumber: "",
    model: "",
    vehicleType: "car",
    status: "available",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/vehicles");
      
      const vehiclesData = response.data?.data || response.data || [];
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to load vehicles";
      setError(msg);
      toast.error(msg);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setEditingVehicle(null);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.vehicleNumber.trim()) {
      errors.vehicleNumber = "Vehicle number is required";
    }
    if (!formData.model.trim()) {
      errors.model = "Model is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setFormLoading(true);

    try {
      // ✅ FIXED: Match backend DTO exactly
      // Backend expects: vehicleNumber, model, type, vehicleType, status
      const payload = {
        vehicleNumber: formData.vehicleNumber.trim(),
        model: formData.model.trim(),
        type: formData.vehicleType, // Send as 'type' for the type field
        vehicleType: formData.vehicleType, // Also send as 'vehicleType' for enum
        status: formData.status, // Use exact values: 'available', 'inMaintenance', 'inUse'
      };

      console.log("📤 SENDING PAYLOAD:", payload);

      let response;

      if (editingVehicle) {
        response = await api.put(`/vehicles/${editingVehicle.id}`, payload);
        console.log("✏️ UPDATE RESPONSE:", response.data);
        
        const updatedVehicle = response.data?.data || response.data;
        setVehicles(
          vehicles.map((v) => (v.id === editingVehicle.id ? updatedVehicle : v))
        );
        toast.success("Vehicle updated successfully!");
      } else {
        response = await api.post("/vehicles", payload);
        console.log("✅ CREATE RESPONSE:", response.data);
        
        const newVehicle = response.data?.data || response.data;
        setVehicles([...vehicles, newVehicle]);
        toast.success("Vehicle added successfully!");
      }

      setDialogOpen(false);
      resetForm();
    } catch (err: any) {
      console.error("❌ ERROR:", err.response?.data);

      // Handle array of validation errors
      if (err.response?.data?.message) {
        const msg = err.response.data.message;
        if (Array.isArray(msg)) {
          msg.forEach((error: string) => {
            toast.error(error);
          });
        } else {
          toast.error(msg);
        }
      } else {
        toast.error("Failed to save vehicle");
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      vehicleNumber: vehicle.vehicleNumber,
      model: vehicle.model,
      vehicleType: vehicle.type.toLowerCase(),
      status: vehicle.status,
    });
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleDelete = async (vehicleId: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    setDeleteLoading(vehicleId);
    try {
      await api.delete(`/vehicles/${vehicleId}`);
      setVehicles(vehicles.filter((v) => v.id !== vehicleId));
      toast.success("Vehicle deleted successfully!");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to delete vehicle";
      toast.error(msg);
    } finally {
      setDeleteLoading(null);
    }
  };

  // Dynamic stats - exact status values from backend
  const stats = [
    { title: "Total Vehicles", value: vehicles.length.toString() },
    {
      title: "Available",
      value: vehicles
        .filter((v) => v.status === "available")
        .length.toString(),
    },
    {
      title: "In Use",
      value: vehicles
        .filter((v) => v.status === "inUse")
        .length.toString(),
    },
    {
      title: "Maintenance",
      value: vehicles
        .filter((v) => v.status === "inMaintenance")
        .length.toString(),
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
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

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white whitespace-nowrap">
              <Plus className="h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 py-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                <Input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="e.g., KA-01-1234"
                  required
                  className={formErrors.vehicleNumber ? "border-red-500" : ""}
                />
                {formErrors.vehicleNumber && (
                  <p className="text-xs text-red-500">{formErrors.vehicleNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g., Honda Activa"
                  required
                  className={formErrors.model ? "border-red-500" : ""}
                />
                {formErrors.model && (
                  <p className="text-xs text-red-500">{formErrors.model}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Type *</Label>
                  <Select
                    value={formData.vehicleType}
                    onValueChange={(value) =>
                      handleSelectChange("vehicleType", value)
                    }
                  >
                    <SelectTrigger id="vehicleType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                      <SelectItem value="scooter">Scooter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="inUse">In Use</SelectItem>
                      <SelectItem value="inMaintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingVehicle ? "Updating..." : "Adding..."}
                    </>
                  ) : editingVehicle ? (
                    "Update Vehicle"
                  ) : (
                    "Add Vehicle"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vehicles Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      ) : error ? (
        <div className="text-red-600 dark:text-red-400 text-center py-8 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {vehicles.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No vehicles found. Add one to get started.
            </div>
          ) : (
            vehicles.map((vehicle) => {
              const config = vehicleIconConfig[vehicle.type?.toLowerCase()] || {
                icon: Car,
                color: "from-teal-400 to-teal-600",
              };
              const VehicleIcon = config.icon;

              const statusDisplay =
                vehicle.status === "inMaintenance"
                  ? "Maintenance"
                  : vehicle.status === "inUse"
                  ? "In Use"
                  : "Available";

              const statusVariant =
                vehicle.status === "available"
                  ? "success"
                  : vehicle.status === "inUse"
                  ? "default"
                  : "destructive";

              return (
                <div
                  key={vehicle.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${config.color}`}
                    >
                      <VehicleIcon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant={statusVariant} className="text-xs">
                      {statusDisplay}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {vehicle.vehicleNumber}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Model:</span>
                      <span className="font-medium text-foreground">
                        {vehicle.model}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium text-foreground capitalize">
                        {vehicle.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Added:</span>
                      <span className="font-medium text-foreground">
                        {new Date(vehicle.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-9 text-xs gap-1"
                      onClick={() => handleEdit(vehicle)}
                    >
                      <Edit2 className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-9 text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(vehicle.id)}
                      disabled={deleteLoading === vehicle.id}
                    >
                      {deleteLoading === vehicle.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}