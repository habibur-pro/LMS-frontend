"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetMyClassesQuery } from "@/redux/api/myClassApi";
import { IMyClass } from "@/types";
import { BookOpen, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MyCourses = () => {
  const { data: myClassRes } = useGetMyClassesQuery("");
  const myClasses: Array<IMyClass> = myClassRes?.data;
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

          {myClasses?.length === 0 ? (
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
              {myClasses?.map((myClass, index) => {
                return (
                  <Card
                    key={myClass?.course?.id || index}
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
                      <div className="md:flex gap-x-8">
                        <div className="relative w-[350px] h-[230px] rounded-lg overflow-hidden flex-shrink-0 border">
                          <Image
                            src={myClass?.course?.thumbnail}
                            alt={myClass?.course?.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold line-clamp-1 text-2xl capitalize">
                              {myClass?.course?.title}
                            </h3>
                            <Badge variant="secondary">
                              {myClass?.overallProgress}% Complete
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {myClass?.course?.description
                              ?.split(" ")
                              .slice(0, 50)
                              .join(" ")}
                          </p>
                          <div className="">
                            <div className="flex-1 mr-4">
                              <Progress
                                value={myClass?.overallProgress}
                                className="h-3"
                              />
                            </div>
                            <div className="mt-8">
                              <Link href={`/my-class/${myClass?.id}`}>
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

export default MyCourses;
