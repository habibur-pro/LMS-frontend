"use client";
import { Badge } from "./ui/badge";
import { sampleCourses } from "@/data/sampleCourses";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { ICourse } from "@/types";
const FeaturedCourse = () => {
  const { data: courseRes } = useGetAllCourseQuery("");
  const courses: Array<ICourse> = courseRes?.data;

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);
  };
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
            Featured Content
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Most Popular Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of students in our top-rated courses designed by
            industry experts
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {courses?.length > 0 &&
                courses.map((course, index) => (
                  <div key={course.id} className="w-full flex-shrink-0">
                    <Card className="mx-4 overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white pb-0">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <div className="relative h-80 md:h-full">
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                              <Button
                                size="lg"
                                className="gradient-button rounded-full shadow-lg transform hover:scale-110 transition-transform text-white"
                              >
                                <Play className="w-6 h-6 mr-2" />
                                Preview Course
                              </Button>
                            </div>
                            <Badge className="absolute top-6 left-6 bg-purple-600 text-white shadow-lg">
                              🔥 Trending
                            </Badge>
                          </div>
                        </div>
                        <div className="md:w-1/2 p-10">
                          <div className="flex items-center space-x-2 mb-4">
                            <Badge
                              variant="secondary"
                              className="bg-purple-100 text-purple-700"
                            >
                              Best Seller
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-gray-300 text-gray-600"
                            >
                              Updated 2025
                            </Badge>
                          </div>
                          <h3 className="text-3xl font-bold mb-4 text-gray-900 leading-tight">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            {course.description}
                          </p>
                          <div className="flex items-center justify-between mb-8">
                            <div>
                              <span className="text-4xl font-black text-purple-600">
                                {course.price}
                              </span>
                              <span className="text-lg text-gray-500 line-through ml-2">
                                $199
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">
                                (4.9 • 2,847 reviews)
                              </span>
                            </div>
                          </div>
                          <Link href={`/courses/${course.slug}`}>
                            <Button className="gradient-button w-full text-lg py-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                              Enroll Now - Limited Time
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300 w-12 h-12"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="flex justify-center mt-8 space-x-3">
            {courses?.length > 0 &&
              courses.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-purple-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourse;
