import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  BookOpen,
  Calendar,
  Clock,
  Edit,
  ShoppingCart,
  Star,
} from "lucide-react";
import { getCourses } from "@/utils/getCourses";
import { ICourse } from "@/types";
import { Badge } from "./ui/badge";

const Courses = async () => {
  const { courses } = await getCourses();
  return (
    <>
      {courses && courses?.length > 0 ? (
        <div
          id="courses"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-8"
        >
          {courses?.map((course: ICourse) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                      ${course.price}
                    </Badge>
                  </div>
                  {/* {isPurchased(course.id) && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white">
                        Purchased
                      </Badge>
                    </div>
                  )} */}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 mb-4">
                  {course.description}
                </CardDescription>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules.length} modules</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    {/* <span>{getTotalLectures(course)} lectures</span> */}
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    (4.8)
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 space-y-2 flex gap-3">
                <Link href={`/courses/${course.id}`} className="w-full">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Details
                  </Button>
                </Link>

                <Link href={`/purchase/${course.id}`} className="w-full">
                  <Button className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
          <Calendar className="w-16 h-16 text-muted-foreground opacity-80" />

          <p className="text-lg font-semibold">Upcoming Courses</p>
          <p className="text-sm text-muted-foreground">
            New courses will be available soon. Stay tuned and check back later!
          </p>
        </div>
      )}
    </>
  );
};

export default Courses;
