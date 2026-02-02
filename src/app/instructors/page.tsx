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
import { Plus, Phone, Mail, Users, CheckCircle, Clock, Loader2, Edit2, Trash2 } from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface Instructor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  experience: number;
  isActive: boolean;
  createdAt: string;
  assignedStudents?: number;  // ← add this (optional because not every instructor may have it)
}

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [search, setSearch] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    experience: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Fetch instructors
  useEffect(() => {
    fetchInstructors();
  }, [search]);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      setError("");
      const url = search ? `/instructors/?search=${encodeURIComponent(search)}` : "/instructors";
      const response = await api.get(url);
      const data = response.data?.data || response.data || [];
      setInstructors(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to load instructors";
      setError(msg);
      toast.error(msg);
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

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setEditingInstructor(null);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (formData.experience < 0) {
      errors.experience = "Experience cannot be negative";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setFormLoading(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        experience: Number(formData.experience),
      };

      let response;

      if (editingInstructor) {
        response = await api.put(`/instructors/${editingInstructor.id}`, payload);
        const updated = response.data?.data || response.data;
        setInstructors(
          instructors.map((i) => (i.id === editingInstructor.id ? updated : i))
        );
        toast.success("Instructor updated successfully!");
      } else {
        response = await api.post("/instructors", payload);
        const newInstructor = response.data?.data || response.data;
        setInstructors([...instructors, newInstructor]);
        toast.success("Instructor added successfully!");
      }

      setDialogOpen(false);
      resetForm();
    } catch (err: any) {
      let errorMsg = "Failed to save instructor";

      if (err.response?.data?.message) {
        const msg = err.response.data.message;
        if (Array.isArray(msg)) {
          errorMsg = msg.join(" • ");
        } else {
          errorMsg = msg;
        }
      }

      toast.error(errorMsg);
      setFormErrors({
        ...formErrors,
        general: errorMsg,
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setFormData({
      fullName: instructor.fullName,
      email: instructor.email,
      phone: instructor.phone,
      experience: instructor.experience,
    });
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleDelete = async (instructorId: string) => {
    if (!confirm("Are you sure you want to delete this instructor?")) return;

    setDeleteLoading(instructorId);
    try {
      await api.delete(`/instructors/${instructorId}`);
      setInstructors(instructors.filter((i) => i.id !== instructorId));
      toast.success("Instructor deleted successfully!");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to delete instructor";
      toast.error(msg);
    } finally {
      setDeleteLoading(null);
    }
  };

  // Dynamic stats
  const totalInstructors = instructors.length;
  const active = instructors.filter((i) => i.isActive).length;
  const onLeave = instructors.filter((i) => !i.isActive).length;
  // Total students — if backend returns assignedStudents, use it; otherwise 0
  const totalStudents = instructors.reduce((sum, i) => sum + (i.assignedStudents || 0), 0);

  const stats = [
    { title: "Total Instructors", value: totalInstructors.toString() },
    { title: "Active", value: active.toString() },
    { title: "On Leave", value: onLeave.toString() },
    { title: "Total Students", value: totalStudents.toString() },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header + Search + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Instructor Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage all instructors and their assignments
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search instructors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white whitespace-nowrap">
                <Plus className="h-4 w-4" />
                Add Instructor
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingInstructor ? "Edit Instructor" : "Add New Instructor"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={formErrors.fullName ? "border-red-500" : ""}
                  />
                  {formErrors.fullName && (
                    <p className="text-xs text-red-500">{formErrors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@gmail.com"
                    required
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9800000000"
                    required
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years) *</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="5"
                    required
                    min="0"
                    className={formErrors.experience ? "border-red-500" : ""}
                  />
                  {formErrors.experience && (
                    <p className="text-xs text-red-500">{formErrors.experience}</p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
                    {error}
                  </p>
                )}

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
                        {editingInstructor ? "Updating..." : "Adding..."}
                      </>
                    ) : editingInstructor ? (
                      "Update Instructor"
                    ) : (
                      "Add Instructor"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
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
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructors Grid */}
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
          {instructors.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No instructors found. Add one to get started.
            </div>
          ) : (
            instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                      {instructor.fullName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {instructor.fullName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {instructor.experience} years experience
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={instructor.isActive ? "success" : "secondary"}
                    className="text-xs"
                  >
                    {instructor.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium text-foreground">{instructor.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground truncate">{instructor.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Added:</span>
                    <span className="font-medium text-foreground">
                      {new Date(instructor.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-9 text-xs gap-1"
                    onClick={() => handleEdit(instructor)}
                  >
                    <Edit2 className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-9 text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(instructor.id)}
                    disabled={deleteLoading === instructor.id}
                  >
                    {deleteLoading === instructor.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}