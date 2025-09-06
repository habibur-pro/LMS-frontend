"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  PlayCircle,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useGetLecturesQuery } from "@/redux/api/lectureApi";
import { ILecture } from "@/types";

export default function AdminLecturesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");

  // ✅ Fetch lectures + filters together
  const { data: lectureDataRes, isLoading } = useGetLecturesQuery({
    searchTerm,
    courseId: selectedCourse,
    moduleId: selectedModule,
  });

  const filters = lectureDataRes?.data?.filters || {
    courses: [],
    modules: [],
    lectureTypes: [],
  };
  const lectures = lectureDataRes?.data?.data || [];
  const courses = filters.courses || [];
  const modules = filters.modules || []; // ✅ fixed

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Lectures Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage and view all lectures across courses and modules
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          <CardDescription>
            Filter lectures by course, module, or search by title
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Course Filter */}
            <Select
              value={selectedCourse}
              onValueChange={(val) => {
                setSelectedCourse(val);
                setSelectedModule("all");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course: any) => (
                  <SelectItem key={course._id} value={course._id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Module Filter */}
            <Select
              value={selectedModule}
              onValueChange={setSelectedModule}
              disabled={selectedCourse === "all"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Modules" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                {modules.map((module: any) => (
                  <SelectItem key={module._id} value={module._id}>
                    {module.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCourse("all");
                setSelectedModule("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lectures Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lectures ({lectures.length})</CardTitle>
          <CardDescription>
            All lectures with course and module information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading lectures...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lecture Title</TableHead>
                    <TableHead>ContentType</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lectures.map((lecture: ILecture, index: number) => (
                    <TableRow key={lecture._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PlayCircle className="h-4 w-4 text-purple-600" />
                          <div>
                            <div className="font-medium">{lecture.title}</div>
                            <div className="text-sm text-gray-500">
                              Lecture {lecture?.lectureNumber || index + 1}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{lecture.contentType}</TableCell>
                      <TableCell>{lecture.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {lecture.resources?.length || 0} files
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {lecture.content ? (
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={lecture.content}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No video
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
