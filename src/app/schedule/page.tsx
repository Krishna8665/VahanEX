"use client";

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Loader2,
  Edit2,
  Trash2,
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
  X,
  AlertCircle,
  Search,
  Car,
  User,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface Schedule {
  id: string;
  studentName: string;
  vehicleNumber: string;
  instructorNames: string[];
  scheduleDate: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "inprogress" | "completed" | "cancelled";
  notes?: string | null;
  createdAt: string;
}

interface StudentOption {
  id: string;
  fullName: string;
}

interface VehicleOption {
  id: string;
  vehicleNumber: string;
}

interface InstructorOption {
  id: string;
  fullName: string;
}

interface StatsData {
  total: number;
  todays: number;
  inprogress: number;
  completed: number;
}

interface CreateFormData {
  studentId: string;
  vehicleId: string;
  instructorIds: string[];
  scheduleDate: string;
  startTime: string;
  endTime: string;
}

interface UpdateFormData {
  startTime: string;
  endTime: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
  meta?: {
    totalPages: number;
    page: number;
    limit: number;
    total: number;
  };
}

interface StudentResponse {
  data: StudentOption[];
}

interface VehicleResponse {
  data: VehicleOption[];
}

interface InstructorResponse {
  data: InstructorOption[];
}

const ITEMS_PER_PAGE = 10;

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);
  const [scheduleToUpdate, setScheduleToUpdate] = useState<Schedule | null>(
    null,
  );

  // Refs for date and time inputs
  const dateInputRef = useRef<HTMLInputElement>(null);
  const startTimeInputRef = useRef<HTMLInputElement>(null);
  const endTimeInputRef = useRef<HTMLInputElement>(null);
  const updateStartTimeInputRef = useRef<HTMLInputElement>(null);
  const updateEndTimeInputRef = useRef<HTMLInputElement>(null);

  // Stats
  const [stats, setStats] = useState<StatsData>({
    total: 0,
    todays: 0,
    inprogress: 0,
    completed: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Dropdown options
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const [instructors, setInstructors] = useState<InstructorOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  // Create form data
  const [createFormData, setCreateFormData] = useState<CreateFormData>({
    studentId: "",
    vehicleId: "",
    instructorIds: [],
    scheduleDate: new Date().toISOString().split("T")[0], // Auto-select today
    startTime: new Date().toTimeString().slice(0, 5), // Auto-select current time (HH:MM)
    endTime: (() => {
      // Auto-calculate end time (1 hour from now)
      const endDate = new Date();
      endDate.setHours(endDate.getHours() + 1);
      return endDate.toTimeString().slice(0, 5);
    })(),
  });

  // Update form data
  const [updateFormData, setUpdateFormData] = useState<UpdateFormData>({
    startTime: "",
    endTime: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Get minimum date (today)
  const minDate = new Date().toISOString().split("T")[0];

  // Get minimum time
  const getMinTime = (): string => {
    if (createFormData.scheduleDate !== minDate) return "00:00";
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Filter schedules based on search
  const filteredSchedules = schedules.filter((schedule) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesStudent = schedule.studentName
      .toLowerCase()
      .includes(searchLower);
    const matchesVehicle = schedule.vehicleNumber
      .toLowerCase()
      .includes(searchLower);
    return matchesStudent || matchesVehicle;
  });

  // Fetch schedules
  useEffect(() => {
    fetchSchedules();
  }, [currentPage, selectedDate]);

  // Fetch stats
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch dropdown options when dialog opens
  useEffect(() => {
    if (createDialogOpen) {
      fetchDropdownOptions();
    }
  }, [createDialogOpen]);

  const fetchSchedules = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        date: selectedDate,
      };

      const response = await api.get<ApiResponse<Schedule[]>>("/schedules", {
        params,
      });
      const data = response.data?.data || [];
      setSchedules(Array.isArray(data) ? data : []);

      const meta = response.data?.meta || { totalPages: 1 };
      setTotalPages(meta?.totalPages || 1);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || "Failed to load schedules";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (): Promise<void> => {
    try {
      setLoadingStats(true);
      const response =
        await api.get<ApiResponse<StatsData>>("/schedules/count");
      setStats(
        response.data?.data || {
          total: 0,
          todays: 0,
          inprogress: 0,
          completed: 0,
        },
      );
    } catch (err: unknown) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchDropdownOptions = async (): Promise<void> => {
    setLoadingOptions(true);
    try {
      const [studentsRes, vehiclesRes, instructorsRes] = await Promise.all([
        api.get<StudentResponse>("/students"),
        api.get<VehicleResponse>("/vehicles"),
        api.get<InstructorResponse>("/instructors"),
      ]);

      setStudents(studentsRes.data?.data || []);
      setVehicles(vehiclesRes.data?.data || []);
      setInstructors(instructorsRes.data?.data || []);
    } catch (err: unknown) {
      toast.error("Failed to load dropdown options");
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleSelectChange = (field: string, value: string): void => {
    setCreateFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };

  const handleInstructorToggle = (instructorId: string): void => {
    setCreateFormData((prev) => {
      if (prev.instructorIds.includes(instructorId)) {
        return {
          ...prev,
          instructorIds: prev.instructorIds.filter((id) => id !== instructorId),
        };
      }
      return {
        ...prev,
        instructorIds: [...prev.instructorIds, instructorId],
      };
    });

    if (formErrors.instructorIds) {
      setFormErrors({ ...formErrors, instructorIds: "" });
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCreateFormData((prev) => ({ ...prev, scheduleDate: value }));
    if (formErrors.scheduleDate) {
      setFormErrors({ ...formErrors, scheduleDate: "" });
    }
  };

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCreateFormData((prev) => {
      // Auto-calculate end time (1 hour after start)
      let newEndTime = prev.endTime;
      if (value) {
        const [hours, minutes] = value.split(":").map(Number);
        const endDate = new Date();
        endDate.setHours(hours + 1, minutes, 0);
        newEndTime = endDate.toTimeString().slice(0, 5);
      }

      return {
        ...prev,
        startTime: value,
        endTime: newEndTime,
      };
    });

    if (formErrors.startTime) {
      setFormErrors({ ...formErrors, startTime: "" });
    }
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCreateFormData((prev) => ({ ...prev, endTime: value }));
    if (formErrors.endTime) {
      setFormErrors({ ...formErrors, endTime: "" });
    }
  };

  const handleUpdateStartTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;
    setUpdateFormData((prev) => ({ ...prev, startTime: value }));
    if (formErrors.startTime) {
      setFormErrors({ ...formErrors, startTime: "" });
    }
  };

  const handleUpdateEndTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;
    setUpdateFormData((prev) => ({ ...prev, endTime: value }));
    if (formErrors.endTime) {
      setFormErrors({ ...formErrors, endTime: "" });
    }
  };

  const validateCreateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!createFormData.studentId) errors.studentId = "Student is required";
    if (!createFormData.vehicleId) errors.vehicleId = "Vehicle is required";
    if (createFormData.instructorIds.length === 0)
      errors.instructorIds = "Select at least one instructor";
    if (!createFormData.scheduleDate) errors.scheduleDate = "Date is required";
    if (!createFormData.startTime) errors.startTime = "Start time is required";
    if (!createFormData.endTime) errors.endTime = "End time is required";

    if (createFormData.startTime && createFormData.endTime) {
      if (createFormData.startTime >= createFormData.endTime) {
        errors.endTime = "End time must be after start time";
      }
    }

    if (createFormData.scheduleDate && createFormData.scheduleDate < minDate) {
      errors.scheduleDate = "Cannot select past dates";
    }

    if (createFormData.scheduleDate === minDate && createFormData.startTime) {
      const minTime = getMinTime();
      if (createFormData.startTime < minTime) {
        errors.startTime = "Cannot select past times";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateUpdateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!updateFormData.startTime) errors.startTime = "Start time is required";
    if (!updateFormData.endTime) errors.endTime = "End time is required";

    if (updateFormData.startTime && updateFormData.endTime) {
      if (updateFormData.startTime >= updateFormData.endTime) {
        errors.endTime = "End time must be after start time";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!validateCreateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setFormLoading(true);

    try {
      const payload = {
        studentId: createFormData.studentId,
        vehicleId: createFormData.vehicleId,
        instructorIds: createFormData.instructorIds,
        scheduleDate: createFormData.scheduleDate,
        startTime: createFormData.startTime,
        endTime: createFormData.endTime,
      };

      await api.post("/schedules", payload);
      toast.success("Schedule created successfully!");
      setCreateDialogOpen(false);
      resetCreateForm();
      fetchSchedules();
      fetchStats();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to create schedule");
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!validateUpdateForm() || !scheduleToUpdate) {
      toast.error("Please fix the form errors");
      return;
    }

    setFormLoading(true);

    try {
      const payload = {
        startTime: updateFormData.startTime,
        endTime: updateFormData.endTime,
      };

      await api.put(`/schedules/${scheduleToUpdate.id}`, payload);
      toast.success("Schedule updated successfully!");
      setUpdateDialogOpen(false);
      resetUpdateForm();
      fetchSchedules();
      fetchStats();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to update schedule");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditClick = (schedule: Schedule): void => {
    setScheduleToUpdate(schedule);
    setUpdateFormData({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    });
    setFormErrors({});
    setUpdateDialogOpen(true);
  };

  const handleDelete = async (): Promise<void> => {
    if (!scheduleToDelete) return;

    setDeleteLoading(true);
    try {
      await api.delete(`/schedules/${scheduleToDelete}`);
      toast.success("Schedule deleted successfully!");
      setDeleteDialogOpen(false);
      setScheduleToDelete(null);
      fetchSchedules();
      fetchStats();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to delete schedule");
    } finally {
      setDeleteLoading(false);
    }
  };

  const resetCreateForm = (): void => {
    setCreateFormData({
      studentId: "",
      vehicleId: "",
      instructorIds: [],
      scheduleDate: "",
      startTime: "",
      endTime: "",
    });
    setFormErrors({});
  };

  const resetUpdateForm = (): void => {
    setUpdateFormData({
      startTime: "",
      endTime: "",
    });
    setFormErrors({});
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            Scheduled
          </Badge>
        );
      case "inprogress":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPaginationRange = (): (number | string)[] => {
    const delta = 2;
    const range: (number | string)[] = [1];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (totalPages > 1) range.push(totalPages);

    const withDots: (number | string)[] = [];
    let prev: number | null = null;

    for (const page of range) {
      if (
        prev !== null &&
        typeof page === "number" &&
        page - (prev as number) > 1
      ) {
        withDots.push("...");
      }
      withDots.push(page);
      if (typeof page === "number") prev = page;
    }

    return withDots;
  };

  const convertTo12Hour = (time24: string): string => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${String(hour12).padStart(2, "0")}:${minutes} ${ampm}`;
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Schedule Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage driving sessions and prevent time conflicts
          </p>
        </div>

        <Button
          onClick={() => {
            resetCreateForm();
            setCreateDialogOpen(true);
          }}
          className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white h-10 px-5 text-sm font-semibold self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          Create Schedule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground dark:text-gray-300">
                  Total Sessions
                </p>
                <p className="text-2xl font-bold mt-1 text-foreground dark:text-white">
                  {loadingStats ? "-" : stats.total}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/30 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground dark:text-gray-300">
                  Today's Sessions
                </p>
                <p className="text-2xl font-bold mt-1 text-foreground dark:text-white">
                  {loadingStats ? "-" : stats.todays}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-teal-600 dark:text-teal-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground dark:text-gray-300">
                  In Progress
                </p>
                <p className="text-2xl font-bold mt-1 text-foreground dark:text-white">
                  {loadingStats ? "-" : stats.inprogress}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground dark:text-gray-300">
                  Completed
                </p>
                <p className="text-2xl font-bold mt-1 text-foreground dark:text-white">
                  {loadingStats ? "-" : stats.completed}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Combined Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by student name or vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 pl-10 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="dateFilter"
            className="text-sm font-medium whitespace-nowrap"
          >
            Date:
          </label>
          <Input
            id="dateFilter"
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 w-40 text-sm"
          />
        </div>
      </div>

      {/* Sessions List */}
      <Card className="border shadow-sm">
        <CardHeader className="border-b pb-2.5 px-3 md:px-4">
          <CardTitle className="text-base md:text-lg font-bold text-foreground">
            Sessions for {new Date(selectedDate).toLocaleDateString()} (
            {filteredSchedules.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-3 md:p-4 space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600 text-sm">{error}</div>
          ) : filteredSchedules.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              No schedules found
            </div>
          ) : (
            <div className="space-y-3 p-3 md:p-4">
              {filteredSchedules.map((session, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-all bg-card"
                >
                  {/* Mobile Layout */}
                  <div className="flex md:hidden flex-col gap-3">
                    {/* Time Slot - Horizontal */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                          {convertTo12Hour(session.startTime)}
                        </p>
                        <div className="h-1 flex-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" />
                        <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                          {convertTo12Hour(session.endTime)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30 flex-shrink-0"
                          onClick={() => handleEditClick(session)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-red-100 dark:hover:bg-red-900/30 flex-shrink-0"
                          onClick={() => {
                            setScheduleToDelete(session.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Details - Mobile */}
                    <div className="space-y-3">
                      {/* Student */}
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground mb-2">
                          Student
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                              {session.studentName.charAt(0)}
                            </div>
                            <p className="text-xs font-medium text-foreground truncate">
                              {session.studentName}
                            </p>
                          </div>
                          {getStatusBadge(session.status)}
                        </div>
                      </div>

                      {/* Vehicle & Instructor */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] font-medium text-muted-foreground mb-2">
                            Vehicle
                          </p>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-teal-600 flex-shrink-0" />
                            <p className="text-xs text-foreground truncate">
                              {session.vehicleNumber}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-medium text-muted-foreground mb-2">
                            Instructor
                          </p>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-teal-600 flex-shrink-0" />
                            <p className="text-xs text-foreground truncate">
                              {session.instructorNames[0] || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tablet & Desktop Layout */}
                  <div className="hidden md:flex md:items-center gap-4">
                    {/* Time Slot - Vertical */}
                    <div className="flex items-center gap-3 min-w-[110px]">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-foreground">
                          {convertTo12Hour(session.startTime)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">to</p>
                        <p className="text-xs font-semibold text-foreground">
                          {convertTo12Hour(session.endTime)}
                        </p>
                      </div>
                      <div className="w-1 h-14 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full flex-shrink-0" />
                    </div>

                    {/* Details - Desktop */}
                    <div className="flex-1 grid grid-cols-3 gap-3 lg:gap-4">
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">
                          Student
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {session.studentName.charAt(0)}
                          </div>
                          <p className="text-xs font-medium text-foreground truncate">
                            {session.studentName}
                          </p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">
                          Vehicle
                        </p>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-teal-600 flex-shrink-0" />
                          <p className="text-xs text-foreground truncate">
                            {session.vehicleNumber}
                          </p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">
                          Instructor
                        </p>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-teal-600 flex-shrink-0" />
                          <p className="text-xs text-foreground truncate">
                            {session.instructorNames[0] || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status + Delete - Desktop */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getStatusBadge(session.status)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900/30"
                        onClick={() => handleEditClick(session)}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:bg-red-100 dark:hover:bg-red-900/30"
                        onClick={() => {
                          setScheduleToDelete(session.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {!loading && schedules.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-gray-300 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {getPaginationRange().map((page, idx) => (
            <Button
              key={`${page}-${idx}`}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              className={`
                h-9 w-9 rounded-full text-sm font-medium transition-all
                ${
                  page === currentPage
                    ? "bg-teal-600 hover:bg-teal-700 text-white border-teal-600 shadow-sm"
                    : "border-gray-300 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200"
                }
                ${
                  page === "..."
                    ? "cursor-default pointer-events-none bg-transparent border-none shadow-none"
                    : ""
                }
              `}
              disabled={page === "..."}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-gray-300 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Create Schedule Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[92vw] sm:w-full max-w-[92vw] sm:max-w-2xl lg:max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden flex flex-col p-0"
        >
          <DialogHeader className="px-3 sm:px-5 lg:px-6 pt-3 sm:pt-5 lg:pt-6 pb-2 sm:pb-3 border-b flex-shrink-0 relative">
            <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold pr-8">
              Create New Schedule
            </DialogTitle>
            {/* Custom close button */}
            <button
              onClick={() => setCreateDialogOpen(false)}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 px-3 sm:px-5 lg:px-6">
            <form
              onSubmit={handleCreateSubmit}
              className="space-y-4 sm:space-y-5 py-3 sm:py-4"
            >
              {/* Student and Vehicle in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                {/* Student Select */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-semibold">
                    Student *
                  </Label>
                  {loadingOptions ? (
                    <Skeleton className="h-10 sm:h-11 w-full" />
                  ) : (
                    <>
                      <Select
                        value={createFormData.studentId}
                        onValueChange={(value) =>
                          handleSelectChange("studentId", value)
                        }
                      >
                        <SelectTrigger
                          className={`h-10 sm:h-11 text-sm ${
                            formErrors.studentId ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.length > 0 ? (
                            students.map((student) => (
                              <SelectItem key={student.id} value={student.id}>
                                {student.fullName}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-center text-sm text-muted-foreground">
                              No students available
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      {formErrors.studentId && (
                        <p className="text-xs text-red-500">
                          {formErrors.studentId}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Vehicle Select */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-semibold">
                    Vehicle *
                  </Label>
                  {loadingOptions ? (
                    <Skeleton className="h-10 sm:h-11 w-full" />
                  ) : (
                    <>
                      <Select
                        value={createFormData.vehicleId}
                        onValueChange={(value) =>
                          handleSelectChange("vehicleId", value)
                        }
                      >
                        <SelectTrigger
                          className={`h-10 sm:h-11 text-sm ${
                            formErrors.vehicleId ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select a vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicles.length > 0 ? (
                            vehicles.map((vehicle) => (
                              <SelectItem key={vehicle.id} value={vehicle.id}>
                                {vehicle.vehicleNumber}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-center text-sm text-muted-foreground">
                              No vehicles available
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      {formErrors.vehicleId && (
                        <p className="text-xs text-red-500">
                          {formErrors.vehicleId}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Instructors Multi-Select */}
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold">
                  Instructors *{" "}
                  {createFormData.instructorIds.length > 0 && (
                    <span className="text-xs font-normal text-muted-foreground">
                      ({createFormData.instructorIds.length} selected)
                    </span>
                  )}
                </Label>
                {loadingOptions ? (
                  <Skeleton className="h-28 sm:h-32 w-full" />
                ) : (
                  <>
                    <div
                      className={`border rounded-lg p-2 sm:p-3 min-h-24 sm:min-h-28 max-h-36 sm:max-h-44 overflow-y-auto ${
                        formErrors.instructorIds
                          ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                          : "border-input bg-background"
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {instructors.length > 0 ? (
                          instructors.map((instructor) => {
                            const isSelected =
                              createFormData.instructorIds.includes(
                                instructor.id,
                              );
                            return (
                              <button
                                key={instructor.id}
                                type="button"
                                onClick={() =>
                                  handleInstructorToggle(instructor.id)
                                }
                                className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all text-left w-full ${
                                  isSelected
                                    ? "bg-teal-600 text-white shadow-md"
                                    : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                                }`}
                              >
                                <span className="flex-1 truncate">
                                  {instructor.fullName}
                                </span>
                                {isSelected && (
                                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <span className="text-xs sm:text-sm text-muted-foreground text-center col-span-2 py-6">
                            No instructors available
                          </span>
                        )}
                      </div>
                    </div>
                    {formErrors.instructorIds && (
                      <p className="text-xs text-red-500">
                        {formErrors.instructorIds}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Date, Start Time, End Time */}
              <div className="space-y-3 sm:space-y-4">
                {/* Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="scheduleDate"
                    className="block text-xs sm:text-sm font-semibold"
                  >
                    Date *
                  </Label>
                  <div className="relative">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 cursor-pointer z-10"
                      onClick={() => dateInputRef.current?.showPicker?.()}
                    >
                      <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    </div>
                    <Input
                      ref={dateInputRef}
                      id="scheduleDate"
                      type="date"
                      value={createFormData.scheduleDate}
                      onChange={handleDateChange}
                      onClick={(e) => {
                        const input = e.currentTarget;
                        input.showPicker?.();
                      }}
                      min={minDate}
                      required
                      className={`h-10 sm:h-11 text-sm pl-9 sm:pl-11 pr-3 cursor-pointer ${
                        formErrors.scheduleDate ? "border-red-500" : ""
                      }`}
                      style={{
                        colorScheme: "light dark",
                      }}
                    />
                  </div>
                  {formErrors.scheduleDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {formErrors.scheduleDate}
                    </p>
                  )}
                </div>

                {/* Time Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Start Time */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="start-time"
                      className="block text-xs sm:text-sm font-semibold"
                    >
                      Start time *
                    </Label>
                    <div className="relative">
                      <div
                        className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 cursor-pointer z-10"
                        onClick={() =>
                          startTimeInputRef.current?.showPicker?.()
                        }
                      >
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                      </div>
                      <Input
                        ref={startTimeInputRef}
                        id="start-time"
                        type="time"
                        value={createFormData.startTime}
                        onChange={handleStartTimeChange}
                        onClick={(e) => {
                          const input = e.currentTarget;
                          input.showPicker?.();
                        }}
                        min={
                          createFormData.scheduleDate === minDate
                            ? getMinTime()
                            : "00:00"
                        }
                        required
                        className={`h-10 sm:h-11 text-sm pl-9 sm:pl-11 pr-3 cursor-pointer ${
                          formErrors.startTime ? "border-red-500" : ""
                        }`}
                        style={{
                          colorScheme: "light dark",
                        }}
                      />
                    </div>
                    {formErrors.startTime && (
                      <p className="text-xs text-red-500 mt-1">
                        {formErrors.startTime}
                      </p>
                    )}
                  </div>

                  {/* End Time */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="end-time"
                      className="block text-xs sm:text-sm font-semibold"
                    >
                      End time *
                    </Label>
                    <div className="relative">
                      <div
                        className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 cursor-pointer z-10"
                        onClick={() => endTimeInputRef.current?.showPicker?.()}
                      >
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                      </div>
                      <Input
                        ref={endTimeInputRef}
                        id="end-time"
                        type="time"
                        value={createFormData.endTime}
                        onChange={handleEndTimeChange}
                        onClick={(e) => {
                          const input = e.currentTarget;
                          input.showPicker?.();
                        }}
                        min={createFormData.startTime || "00:00"}
                        required
                        className={`h-10 sm:h-11 text-sm pl-9 sm:pl-11 pr-3 cursor-pointer ${
                          formErrors.endTime ? "border-red-500" : ""
                        }`}
                        style={{
                          colorScheme: "light dark",
                        }}
                      />
                    </div>
                    {formErrors.endTime && (
                      <p className="text-xs text-red-500 mt-1">
                        {formErrors.endTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Dialog Footer - Fixed at bottom */}
          <DialogFooter className="gap-2.5 sm:gap-3 px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 border-t flex-shrink-0 flex-col-reverse sm:flex-row bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCreateDialogOpen(false);
                resetCreateForm();
              }}
              disabled={formLoading}
              className="h-9 sm:h-10 px-4 sm:px-5 text-sm w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const form = document.querySelector("form");
                if (form) {
                  const event = new Event("submit", {
                    bubbles: true,
                    cancelable: true,
                  });
                  form.dispatchEvent(event);
                }
              }}
              className="h-9 sm:h-10 px-5 sm:px-6 text-sm bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto"
              disabled={formLoading}
            >
              {formLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Schedule"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Schedule Dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[92vw] sm:w-full max-w-[92vw] sm:max-w-md max-h-[92vh] sm:max-h-[88vh] overflow-hidden flex flex-col p-0"
        >
          <DialogHeader className="px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3 border-b flex-shrink-0 relative">
            <DialogTitle className="text-lg sm:text-xl font-bold pr-8">
              Update Schedule Time
            </DialogTitle>
            {/* Custom close button */}
            <button
              onClick={() => setUpdateDialogOpen(false)}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 px-3 sm:px-5">
            <form
              onSubmit={handleUpdateSubmit}
              className="space-y-4 sm:space-y-5 py-3 sm:py-4"
            >
              {/* Start Time */}
              <div className="space-y-2">
                <Label
                  htmlFor="update-start-time"
                  className="block text-xs sm:text-sm font-semibold"
                >
                  Start time *
                </Label>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 cursor-pointer z-10"
                    onClick={() =>
                      updateStartTimeInputRef.current?.showPicker?.()
                    }
                  >
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </div>
                  <Input
                    ref={updateStartTimeInputRef}
                    id="update-start-time"
                    type="time"
                    value={updateFormData.startTime}
                    onChange={handleUpdateStartTimeChange}
                    onClick={(e) => {
                      const input = e.currentTarget;
                      input.showPicker?.();
                    }}
                    required
                    className={`h-10 sm:h-11 text-sm pl-9 sm:pl-11 pr-3 cursor-pointer ${
                      formErrors.startTime ? "border-red-500" : ""
                    }`}
                    style={{
                      colorScheme: "light dark",
                    }}
                  />
                </div>
                {formErrors.startTime && (
                  <p className="text-xs text-red-500 mt-1">
                    {formErrors.startTime}
                  </p>
                )}
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <Label
                  htmlFor="update-end-time"
                  className="block text-xs sm:text-sm font-semibold"
                >
                  End time *
                </Label>
                <div className="relative">
                  <div
                    className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 cursor-pointer z-10"
                    onClick={() =>
                      updateEndTimeInputRef.current?.showPicker?.()
                    }
                  >
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </div>
                  <Input
                    ref={updateEndTimeInputRef}
                    id="update-end-time"
                    type="time"
                    value={updateFormData.endTime}
                    onChange={handleUpdateEndTimeChange}
                    onClick={(e) => {
                      const input = e.currentTarget;
                      input.showPicker?.();
                    }}
                    min={updateFormData.startTime || "00:00"}
                    required
                    className={`h-10 sm:h-11 text-sm pl-9 sm:pl-11 pr-3 cursor-pointer ${
                      formErrors.endTime ? "border-red-500" : ""
                    }`}
                    style={{
                      colorScheme: "light dark",
                    }}
                  />
                </div>
                {formErrors.endTime && (
                  <p className="text-xs text-red-500 mt-1">
                    {formErrors.endTime}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Dialog Footer - Fixed at bottom */}
          <DialogFooter className="gap-2.5 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 border-t flex-shrink-0 flex-col-reverse sm:flex-row bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setUpdateDialogOpen(false);
                resetUpdateForm();
              }}
              disabled={formLoading}
              className="h-9 sm:h-10 px-4 sm:px-5 text-sm w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const form = document.querySelector("form");
                if (form) {
                  const event = new Event("submit", {
                    bubbles: true,
                    cancelable: true,
                  });
                  form.dispatchEvent(event);
                }
              }}
              className="h-9 sm:h-10 px-5 sm:px-6 text-sm bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto"
              disabled={formLoading}
            >
              {formLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Schedule"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="w-full max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Delete Schedule
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this schedule? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <AlertDialogCancel className="h-11 px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLoading}
              className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
