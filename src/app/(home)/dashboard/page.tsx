import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const enrolledCourses = [
  {
    id: "course-1",
    title: "Mastering React & Next.js",
    description:
      "Learn how to build modern web applications with React, Next.js, and Tailwind CSS.",
    thumbnail:
      "https://images.unsplash.com/photo-1584697964194-d7f9d8d1d5d1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "course-2",
    title: "Fullstack Development with Node.js",
    description:
      "A complete guide to building scalable backend systems and APIs using Node.js and Express.",
    thumbnail:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "course-3",
    title: "UI/UX Design Essentials",
    description:
      "Design user-friendly and modern interfaces with Figma, focusing on usability and accessibility.",
    thumbnail:
      "https://images.unsplash.com/photo-1581091012184-5c3c7fef5b3a?auto=format&fit=crop&w=800&q=80",
  },
];
const page = () => {
  function getRandomProgress(): number {
    return Math.floor(Math.random() * 101); // 0 to 100
  }
  return (
    <div className="container mx-auto px-4 py-8   flex  justify-center">
      <div className="max-w-full xl:max-w-7xl w-full ">
        {/* My Courses */}
        <div className="">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Link href="/courses">
              <Button variant="outline" className="bg-transparent">
                Browse All Courses
              </Button>
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No courses enrolled yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start your learning journey by enrolling in your first course
                </p>
                <Link href="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const progress = getRandomProgress();
                return (
                  <Card
                    key={course.id}
                    className="hover:shadow-md transition-all duration-300"
                  >
                    {/* <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src="https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg"
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold line-clamp-1">
                              {course.title}
                            </h3>
                            <Badge variant="secondary">
                              {progress}% Complete
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {course.description}
                          </p>
                          <div className="">
                            <div className="flex-1 mr-4">
                              <Progress value={progress} className="h-2" />
                            </div>
                            <div className="mt-5">
                              <Link href={`/courses/${course.id}/lectures`}>
                                <Button size="sm">
                                  <Play className="w-4 h-4 mr-2" />
                                  Continue
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent> */}
                    <CardContent>
                      <div className="flex gap-x-8">
                        <div className="relative w-[350px] h-[230px] rounded-lg overflow-hidden flex-shrink-0 border">
                          <Image
                            src="https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg"
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold line-clamp-1 text-2xl">
                              {course.title}
                            </h3>
                            <Badge variant="secondary">
                              {progress}% Complete
                            </Badge>
                          </div>
                          <p className="text-lg text-muted-foreground line-clamp-2 mb-3">
                            {course.description}
                          </p>
                          <div className="">
                            <div className="flex-1 mr-4">
                              <Progress value={progress} className="h-3" />
                            </div>
                            <div className="mt-8">
                              <Link href={`/courses/${course.id}/lectures`}>
                                <Button size="lg" className="rounded-full">
                                  <Play className="w-4 h-4 mr-2" />
                                  Continue
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
