"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/course";
import { Search, Clock, BookOpen, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sampleCourses } from "@/data/sampleCourses";
import { Navigation } from "@/components/Navication";

const getAllCourses = () => {
  return sampleCourses;
};

export default function CoursesPage() {
  const [courses] = useState<Course[]>(getAllCourses());
  const [searchTerm, setSearchTerm] = useState("");
  const isPurchased = false;

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalLectures = (course: Course) => {
    return course.modules.reduce(
      (total, module) => total + module.lectures.length,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation type="user" />

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

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {courses.length}
              </div>
              <p className="text-gray-600">Total Courses</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {courses.reduce(
                  (total, course) => total + getTotalLectures(course),
                  0
                )}
              </div>
              <p className="text-gray-600">Total Lectures</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-pink-600 mb-2">
                {courses.reduce(
                  (total, course) => total + course.modules.length,
                  0
                )}
              </div>
              <p className="text-gray-600">Total Modules</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white shadow-lg">
                      {course.price}
                    </Badge>
                  </div>
                  {isPurchased && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white shadow-lg">
                        Purchased
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 line-clamp-2 text-gray-900">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 mb-4 text-gray-600">
                  {course.description}
                </CardDescription>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules.length} modules</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{getTotalLectures(course)} lectures</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 space-y-2">
                <Link href={`/courses/${course.id}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    View Details
                  </Button>
                </Link>
                {isPurchased ? (
                  <Link
                    href={`/courses/${course.id}/lectures`}
                    className="w-full"
                  >
                    <Button className="w-full gradient-button text-white">
                      Start Course
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/purchase/${course.id}`} className="w-full">
                    <Button className="w-full gradient-button text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
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
