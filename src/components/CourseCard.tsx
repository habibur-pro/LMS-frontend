import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock12, Star } from "lucide-react";
import { ICourse } from "@/types";
import Link from "next/link";

const CourseCard = ({ course }: { course: ICourse }) => {
  return (
    <Link href={`/courses/${course.slug}`} className="block">
      <Card className="hover:shadow-lg transition-shadow bg-white pt-0 pb-6">
        <div className="relative h-56">
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <Badge className="absolute top-4 left-4 bg-green-500 text-white">
            New
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Image
              alt="instruction photo"
              // src={course.instructor.}
              src="/images/user.jpg"
              width={100}
              height={100}
              className="size-12 rounded-full object-cover"
            />
            <p>{course?.instructor?.name}</p>
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900 mt-3">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center gap-2 pb-3">
            <Clock12 className="h-5 w-5 text-text-gray-600" />
            <p>18:00 Hours</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl text-purple-600">
              {course.price}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-500">4.8</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
