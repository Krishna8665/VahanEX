// src/app/students/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { dummyStudents } from "@/data/studentsData";

const ITEMS_PER_PAGE = 15;

export default function StudentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter students based on search
  const filteredStudents = dummyStudents.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.dlNumber.toLowerCase().includes(query) ||
      student.phone.includes(query)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            Student Management
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
            Manage all registered students and their training status
          </p>
        </div>
        <Button className="gap-2 whitespace-nowrap shadow-sm w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base">
          <Plus className="h-4 w-4" />
          <span className="sm:inline">Add New Student</span>
        </Button>
      </div>

      {/* Search Bar - Responsive */}
      <div className="relative w-full sm:max-w-md lg:max-w-2xl xl:max-w-3xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name, DL number or phone..."
          className="pl-10 sm:pl-12 h-10 sm:h-11 text-sm sm:text-base w-full"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Students Table - Fully Responsive */}
      <Card className="shadow-sm border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-gray-300 dark:border-gray-700">
                  <TableHead className="h-12 sm:h-14 font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 w-[180px] sm:w-[220px] px-3 sm:px-6">
                    Student
                  </TableHead>
                  <TableHead className="h-12 sm:h-14 font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 px-3 sm:px-6 min-w-[140px]">
                    Contact
                  </TableHead>
                  <TableHead className="h-12 sm:h-14 font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 px-3 sm:px-6 min-w-[150px]">
                    Address
                  </TableHead>
                  <TableHead className="h-12 sm:h-14 font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 px-3 sm:px-6 min-w-[120px]">
                    Registration
                  </TableHead>
                  <TableHead className="h-12 sm:h-14 font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 text-center px-3 sm:px-6 min-w-[110px]">
                    Days Left
                  </TableHead>
                  <TableHead className="h-12 sm:h-14 font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 text-center px-3 sm:px-6 min-w-[90px]">
                    Status
                  </TableHead>
                  <TableHead className="h-12 sm:h-14 font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 text-right px-3 sm:px-6 w-[120px] sm:w-[140px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-muted/30 transition-colors border-b border-gray-200 dark:border-gray-800"
                    >
                      {/* Student Name + DL Number */}
                      <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0 shadow-sm">
                            {student.initial}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-xs sm:text-sm text-foreground truncate">
                              {student.name}
                            </span>
                            <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
                              {student.dlNumber}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Contact */}
                      <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                        <span className="text-xs sm:text-sm text-foreground">
                          {student.phone}
                        </span>
                      </TableCell>

                      {/* Address */}
                      <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                        <span className="text-xs sm:text-sm text-foreground truncate block">
                          {student.address}
                        </span>
                      </TableCell>

                      {/* Registration Date */}
                      <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                        <span className="text-xs sm:text-sm text-foreground">
                          {student.registrationDate}
                        </span>
                      </TableCell>

                      {/* Remaining Days */}
                      <TableCell className="text-center py-3 sm:py-4 px-3 sm:px-6">
                        <span
                          className={`inline-flex items-center justify-center px-2 sm:px-3 py-1 rounded-full font-semibold text-[10px] sm:text-xs whitespace-nowrap ${
                            student.remainingDays <= 3
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : student.remainingDays <= 7
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {student.remainingDays} days
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-center py-3 sm:py-4 px-3 sm:px-6">
                        <Badge
                          variant={
                            student.remainingDays > 7
                              ? "default"
                              : student.remainingDays > 3
                              ? "secondary"
                              : "destructive"
                          }
                          className="font-medium text-[10px] sm:text-xs"
                        >
                          {student.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-3 sm:py-4 px-3 sm:px-6">
                        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                            title="View Details"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400"
                            title="Edit"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-12 text-muted-foreground text-sm"
                    >
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination - Fully Responsive */}
          {filteredStudents.length > 0 && (
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {startIndex + 1}–{Math.min(endIndex, filteredStudents.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {filteredStudents.length}
                </span>{" "}
                students
              </p>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="gap-1 h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </Button>
                
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-7 h-7 sm:w-9 sm:h-9 text-xs sm:text-sm p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="gap-1 h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}