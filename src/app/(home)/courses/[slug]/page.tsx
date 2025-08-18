"use client";

// import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Play,
  Clock,
  BookOpen,
  Star,
  User,
  MessageSquare,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sampleCourses } from "@/lib/sample-course-data";

export default function CourseDetailPage() {
  const course = sampleCourses[0];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <Navigation type="user" /> */}

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div>
              <div className="relative h-96 w-full mb-6 rounded-lg overflow-hidden">
                <Image
                  src="https://www.tekksolglobal.com/wp-content/uploads/2024/05/python-training-service-e1716919622893.png"
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {course.description}
              </p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    (4.8 • 1,234 reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.modules.length} modules</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>1 lectures</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>5hours</span>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {course.modules.length} modules • 5 lectures • 2 min total
                  length
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.modules.map((module, index) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Module {module.moduleNumber}: {module.title}
                      </h3>
                      <Badge variant="secondary">
                        {module.lectures.length} lectures
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {module.lectures.map((lecture) => (
                        <div
                          key={lecture.id}
                          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <Play className="w-4 h-4" />
                          <span>{lecture.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Instructor Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Instructor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    JS
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      John Smith
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Senior Software Engineer
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      John has over 10 years of experience in web development
                      and has taught thousands of students through his
                      comprehensive courses. He specializes in modern JavaScript
                      frameworks and backend development.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Student Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    name: "Sarah Johnson",
                    rating: 5,
                    comment:
                      "Excellent course! The explanations are clear and the projects are very practical.",
                    date: "2 weeks ago",
                  },
                  {
                    name: "Mike Chen",
                    rating: 5,
                    comment:
                      "This course helped me land my first developer job. Highly recommended!",
                    date: "1 month ago",
                  },
                  {
                    name: "Emily Davis",
                    rating: 4,
                    comment:
                      "Great content and well-structured. Would love to see more advanced topics.",
                    date: "3 weeks ago",
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {review.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                {/* Course Thumbnail */}
                <div className="relative w-full h-40 mb-6">
                  <Image
                    src="https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg"
                    alt={course.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {course.price}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    One-time payment
                  </p>
                </div>

                {/* CTA Button */}
                <Link href={`/courses/${course.id}/purchase`}>
                  <Button size="lg" className="w-full mb-4">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Enroll on course
                  </Button>
                </Link>

                {/* Guarantee */}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    30-day money-back guarantee
                  </p>
                </div>

                <Separator className="my-6" />

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    This course includes:
                  </h3>
                  <div className="space-y-3">
                    {[
                      `5 on-demand video lectures`,
                      `${course.modules.length} comprehensive modules`,
                      "Downloadable resources and PDFs",
                      "Full lifetime access",
                      "Access on mobile and desktop",
                      "Certificate of completion",
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
