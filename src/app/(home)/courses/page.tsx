"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader, Search } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { ICourse } from "@/types";

export default function CoursesPage() {
  const { data: courseRes, isLoading } = useGetAllCourseQuery("");
  const courses: Array<ICourse> = courseRes?.data;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses?.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="w-5 h-5 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover high-quality courses designed to help you master new skills
            and advance your career
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses?.length > 0 &&
            filteredCourses?.map((course) => (
              <CourseCard key={course.id + "courses"} course={course} />
            ))}
        </div>

        {!filteredCourses?.length && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
