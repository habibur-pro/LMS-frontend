"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import { ICourse } from "@/types";
import CourseInfo from "@/components/CourseInfo";

import { useGetCourseQuery } from "@/redux/api/courseApi";
import ModulesAndLectures from "@/components/ModulesAndLectures";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const AdminCourseDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { data: courseRes } = useGetCourseQuery(slug, { skip: !slug });
  const course: ICourse = courseRes?.data;

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center space-x-4 mb-8 justify-between">
        <div>
          <h1 className="text-3xl font-bold ">{course.title}</h1>
          <p className="text-gray-700 mt-1">Manage modules and lectures</p>
        </div>
        <Link href={`/admin/courses/${course.slug}`}>
          <Button className="flex items-center">
            <ExternalLink className="w-4 h-4" />
            <span>Preview</span>
          </Button>
        </Link>
      </div>

      <div className="grid gap-8">
        {/* Course Info */}
        <CourseInfo course={course} />
        {/* Modules and Lectures */}
        <hr />
        <ModulesAndLectures course={course} />
      </div>
    </div>
  );
};
export default AdminCourseDetailPage;
