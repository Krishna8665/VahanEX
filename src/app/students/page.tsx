"use client";

import { useState, useEffect, useRef } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Loader2,
  Edit2,
  Trash2,
  Eye,
  AlertCircle,
} from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface Student {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  courseStartDate: string;
  courseEndDate: string;
  isActive: boolean;
  createdAt: string;
}

const ITEMS_PER_PAGE = 10;

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    courseStartDate: "",
    courseEndDate: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchStudents();
  }, [currentPage, debouncedSearch]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const params = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        ...(debouncedSearch && { search: debouncedSearch }),
      };
      const response = await api.get("/students", { params });
      console.log("API Response:", response.data); // Debug log
      
      const data = response.data?.data || [];
      setStudents(Array.isArray(data) ? data : []);

      // Handle different possible response structures
      const meta = response.data?.meta || response.data?.pagination || {};
      const pages = meta.totalPages || meta.total_pages || 1;
      
      console.log("Total Pages:", pages); // Debug log
      setTotalPages(pages);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to load students";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }

    // Validate end date when start date changes
    if (name === "courseStartDate" && formData.courseEndDate) {
      const startDate = new Date(value);
      const endDate = new Date(formData.courseEndDate);
      if (startDate > endDate) {
        setFormErrors({
          ...formErrors,
          courseStartDate: "Start date cannot be after end date",
        });
      }
    }

    // Validate start date when end date changes
    if (name === "courseEndDate" && formData.courseStartDate) {
      const startDate = new Date(formData.courseStartDate);
      const endDate = new Date(value);
      if (endDate < startDate) {
        setFormErrors({
          ...formErrors,
          courseEndDate: "End date cannot be before start date",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setEditingStudent(null);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.courseStartDate)
      errors.courseStartDate = "Start date is required";
    if (!formData.courseEndDate) errors.courseEndDate = "End date is required";

    // Validate date relationship
    if (formData.courseStartDate && formData.courseEndDate) {
      const startDate = new Date(formData.courseStartDate);
      const endDate = new Date(formData.courseEndDate);
      if (startDate > endDate) {
        errors.courseEndDate = "End date must be after or equal to start date";
      }
      if (endDate < startDate) {
        errors.courseStartDate =
          "Start date must be before or equal to end date";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setFormLoading(true);

    try {
      let payload: Record<string, any> = {};

      if (editingStudent) {
        // Only send changed fields on update
        if (formData.fullName.trim() !== editingStudent.fullName) {
          payload.fullName = formData.fullName.trim();
        }
        if (formData.email.trim() !== editingStudent.email) {
          payload.email = formData.email.trim();
        }
        if (formData.phone.trim() !== editingStudent.phone) {
          payload.phone = formData.phone.trim();
        }
        if (formData.address.trim() !== editingStudent.address) {
          payload.address = formData.address.trim();
        }
        if (
          formData.courseStartDate !==
          new Date(editingStudent.courseStartDate).toISOString().split("T")[0]
        ) {
          payload.courseStartDate = new Date(
            formData.courseStartDate,
          ).toISOString();
        }
        if (
          formData.courseEndDate !==
          new Date(editingStudent.courseEndDate).toISOString().split("T")[0]
        ) {
          payload.courseEndDate = new Date(
            formData.courseEndDate,
          ).toISOString();
        }

        // Check if no changes
        if (Object.keys(payload).length === 0) {
          toast((t) => <div>No changes detected</div>, { duration: 3000 });
          setDialogOpen(false);
          resetForm();
          setFormLoading(false);
          return;
        }

        // Make update request
        const response = await api.put(
          `/students/${editingStudent.id}`,
          payload,
        );
        const updated = response.data?.data || response.data;
        setStudents(
          students.map((s) => (s.id === editingStudent.id ? updated : s)),
        );
        toast.success("Student updated successfully!");
      } else {
        // Send all for create
        payload = {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          courseStartDate: new Date(formData.courseStartDate).toISOString(),
          courseEndDate: new Date(formData.courseEndDate).toISOString(),
        };

        const response = await api.post("/students", payload);
        const newStudent = response.data?.data || response.data;
        setStudents([...students, newStudent]);
        toast.success("Student added successfully!");
      }

      setDialogOpen(false);
      resetForm();
      fetchStudents();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to save student";
      if (Array.isArray(msg)) {
        toast.error(msg.join(" • "));
      } else {
        toast.error(msg);
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      address: student.address,
      courseStartDate: new Date(student.courseStartDate)
        .toISOString()
        .split("T")[0],
      courseEndDate: new Date(student.courseEndDate)
        .toISOString()
        .split("T")[0],
    });
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!studentToDelete) return;

    setDeleteLoading(true);
    try {
      await api.delete(`/students/${studentToDelete}`);
      setStudents(students.filter((s) => s.id !== studentToDelete));
      toast.success("Student deleted successfully!");
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
      fetchStudents();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to delete student";
      toast.error(msg);
    } finally {
      setDeleteLoading(false);
    }
  };

  const calculateRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    // Always show page 1
    range.push(1);

    // Pages around current
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show last page if more than 1
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Build with dots
    let prev: number | null = null;
    for (const page of range) {
      if (prev !== null) {
        if (typeof page === "number" && page - (prev as number) > 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(page);
      if (typeof page === "number") prev = page;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Header + Add Button in same line */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Student Management
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage all registered students and their training status
          </p>
        </div>

        <Button
          onClick={() => {
            resetForm();
            setDialogOpen(true);
          }}
          className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white whitespace-nowrap h-11 px-6 text-base font-semibold self-start sm:self-center"
        >
          <Plus className="h-5 w-5" />
          Add Student
        </Button>
      </div>

      {/* Search bar below */}
      <Input
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full h-11 text-base"
      />

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingStudent ? "Edit Student" : "Add New Student"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-base font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Ram Bahadur Thapa"
                  required
                  className={`h-11 text-base ${formErrors.fullName ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {formErrors.fullName && (
                  <p className="text-xs text-red-500">{formErrors.fullName}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ram@example.com"
                  required
                  className={`h-11 text-base ${formErrors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {formErrors.email && (
                  <p className="text-xs text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-base font-semibold">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9800000000"
                  required
                  className={`h-11 text-base ${formErrors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-500">{formErrors.phone}</p>
                )}
              </div>

              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="address" className="text-base font-semibold">
                  Address *
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="New Road, Kathmandu"
                  required
                  className={`h-11 text-base ${formErrors.address ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {formErrors.address && (
                  <p className="text-xs text-red-500">{formErrors.address}</p>
                )}
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="courseStartDate"
                  className="text-base font-semibold"
                >
                  Course Start Date *
                </Label>
                <Input
                  id="courseStartDate"
                  name="courseStartDate"
                  type="date"
                  value={formData.courseStartDate}
                  onChange={handleInputChange}
                  required
                  className={`h-11 text-base ${formErrors.courseStartDate ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {formErrors.courseStartDate && (
                  <p className="text-xs text-red-500">
                    {formErrors.courseStartDate}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="courseEndDate"
                  className="text-base font-semibold"
                >
                  Course End Date *
                </Label>
                <Input
                  id="courseEndDate"
                  name="courseEndDate"
                  type="date"
                  value={formData.courseEndDate}
                  onChange={handleInputChange}
                  required
                  min={
                    formData.courseStartDate ||
                    new Date().toISOString().split("T")[0]
                  }
                  className={`h-11 text-base ${formErrors.courseEndDate ? "border-red-500 focus:ring-red-500" : ""}`}
                />
                {formErrors.courseEndDate && (
                  <p className="text-xs text-red-500">
                    {formErrors.courseEndDate}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
                {error}
              </p>
            )}

            <DialogFooter className="gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
                disabled={formLoading}
                className="h-11 px-6 text-base"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 px-8 text-base bg-teal-600 hover:bg-teal-700"
                disabled={formLoading || Object.keys(formErrors).length > 0}
              >
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {editingStudent ? "Updating..." : "Adding..."}
                  </>
                ) : editingStudent ? (
                  "Update Student"
                ) : (
                  "Add Student"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Table with Pagination attached */}
      {loading ? (
        <div className="space-y-4">
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-red-600 dark:text-red-400 text-center py-12 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
          {error}
        </div>
      ) : (
        <Card className="shadow-sm border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-gray-300 dark:border-gray-700">
                    <TableHead className="h-12 font-bold text-xs sm:text-sm px-6 py-3">
                      Name
                    </TableHead>
                    <TableHead className="h-12 font-bold text-xs sm:text-sm px-6 py-3">
                      Phone
                    </TableHead>
                    <TableHead className="h-12 font-bold text-xs sm:text-sm px-6 py-3">
                      Address
                    </TableHead>
                    <TableHead className="h-12 font-bold text-xs sm:text-sm px-6 py-3">
                      Course Dates
                    </TableHead>
                    <TableHead className="h-12 font-bold text-xs sm:text-sm text-center px-6 py-3">
                      Remaining Days
                    </TableHead>
                    <TableHead className="h-12 font-bold text-xs sm:text-sm text-center px-6 py-3">
                      Status
                    </TableHead>
                    <TableHead className="h-12 font-bold text-xs sm:text-sm text-right px-6 py-3">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.length > 0 ? (
                    students.map((student) => {
                      const remainingDays = calculateRemainingDays(
                        student.courseEndDate,
                      );
                      const statusVariant =
                        remainingDays > 7
                          ? "success"
                          : remainingDays > 3
                            ? "secondary"
                            : "destructive";

                      return (
                        <TableRow
                          key={student.id}
                          className="hover:bg-muted/30 transition-colors border-b border-gray-200 dark:border-gray-800"
                        >
                          <TableCell className="px-6 py-4">
                            <div className="font-bold text-base truncate">
                              {student.fullName}
                            </div>
                            <div className="text-sm text-muted-foreground truncate">
                              {student.email}
                            </div>
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm">
                            {student.phone}
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm truncate max-w-[200px]">
                            {student.address}
                          </TableCell>

                          <TableCell className="px-6 py-4 text-sm">
                            <div className="flex flex-col gap-1">
                              <span>
                                Start:{" "}
                                {new Date(
                                  student.courseStartDate,
                                ).toLocaleDateString()}
                              </span>
                              <span>
                                End:{" "}
                                {new Date(
                                  student.courseEndDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                                remainingDays <= 3
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                  : remainingDays <= 7
                                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              }`}
                            >
                              {remainingDays} days
                            </span>
                          </TableCell>

                          <TableCell className="px-6 py-4 text-center">
                            <Badge
                              variant={statusVariant}
                              className="text-sm px-3 py-1"
                            >
                              {remainingDays > 0 ? "Active" : "Expired"}
                            </Badge>
                          </TableCell>

                          <TableCell className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600"
                                title="View Details"
                              >
                                <Eye className="h-5 w-5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-600"
                                onClick={() => handleEdit(student)}
                              >
                                <Edit2 className="h-5 w-5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                                onClick={() => {
                                  setStudentToDelete(student.id);
                                  setDeleteDialogOpen(true);
                                }}
                                disabled={deleteLoading}
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-16 text-muted-foreground text-lg"
                      >
                        No students found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination inside the Card - attached to table */}
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, students.length)}
                </span>{" "}
                of <span className="font-medium text-foreground">{students.length}</span> students
              </p>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm gap-1"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {getPaginationRange().map((page, idx) => (
                    <Button
                      key={`${page}-${idx}`}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      className={`w-7 h-7 sm:w-9 sm:h-9 text-xs sm:text-sm p-0 ${
                        page === currentPage
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : ""
                      } ${
                        page === "..."
                          ? "cursor-default pointer-events-none border-none hover:bg-transparent"
                          : ""
                      }`}
                      disabled={page === "..."}
                      onClick={() => typeof page === "number" && setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm gap-1"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="w-full max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Delete Student
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this student? This action cannot
              be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <AlertDialogCancel 
              className="h-11 px-6"
              onClick={() => setStudentToDelete(null)}
            >
              Cancel
            </AlertDialogCancel>
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