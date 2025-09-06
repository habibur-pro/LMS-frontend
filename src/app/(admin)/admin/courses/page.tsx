"use client";
import StatsCard from "@/components/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseStatus } from "@/enum";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { ICourse } from "@/types";
import { minutesToHours } from "@/utils/munitesToHours";
import {
  BookOpen,
  Copy,
  Edit,
  ExternalLink,
  Eye,
  Filter,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const getCourseCounts = (courses: ICourse[]) => {
  return courses?.reduce(
    (acc, course) => {
      switch (course.status) {
        case CourseStatus.PUBLISHED:
          acc.published += 1;
          break;
        case CourseStatus.UPCOMING:
          acc.upcoming += 1;
          break;
        case CourseStatus.DRAFTED:
          acc.draft += 1;
          break;
      }
      return acc;
    },
    { published: 0, upcoming: 0, draft: 0 }
  );
};

const Page = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: courseRes } = useGetAllCourseQuery("");
  const courses: Array<ICourse> = courseRes?.data;

  const filteredData = useMemo(() => {
    const filtered = courses?.filter((course) => {
      const matchesSearch =
        course?.id === searchTerm ||
        course?.title?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
    return filtered;
  }, [searchTerm, statusFilter, courses]);
  const counts = getCourseCounts(courses);
  console.log(counts);
  return (
    <div>
      <div className="flex justify-between items-center pb-8">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-sm text-muted-foreground">All courses</p>
        </div>
        <Link href="/admin/courses/add-course">
          <Button>Add Course</Button>
        </Link>
      </div>
      {/* headers  */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="total course"
          value={courses?.length || 0}
          Icon={BookOpen}
        />
        <StatsCard
          title="Published course"
          value={counts?.published || 0}
          Icon={BookOpen}
        />
        <StatsCard
          title="upcomming course"
          value={counts?.upcoming || 0}
          Icon={BookOpen}
        />
        <StatsCard
          title="draft course"
          value={counts?.draft || 0}
          Icon={BookOpen}
        />
      </div>
      {/* Filters */}
      <Card className="my-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Courses</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by title, instructor, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(CourseStatus).map((item) => (
                    <SelectItem className="uppercase" key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* table  */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 ">
                <tr>
                  {[
                    "Course",
                    "Status",
                    "Price",
                    "Enrollment",
                    "Duration",
                    "Created",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700  uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white  divide-y divide-gray-200 ">
                {filteredData?.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 ">
                    {/* Course */}
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <Image
                        src={course.thumbnail}
                        width={50}
                        height={50}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium  ">
                          {course.title}
                        </div>
                      </div>
                    </td>

                    {/* Other columns */}

                    <td className="px-6 py-4">{course?.status}</td>
                    <td className="px-6 py-4">{course.price}</td>
                    <td className="px-6 py-4">
                      {course?.totalSeat - course?.availableSeat}
                    </td>
                    <td className="px-6 py-4 text-sm  ">
                      {minutesToHours(course.duration)}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 ">
                      {moment(course.createdAt).format("DD-MM-YYYY")}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                      <Button
                        className="bg-blue-500 hover:bg-blue-700"
                        size="sm"
                        onClick={() =>
                          router.push(`/admin/courses/${course.slug}/manage`)
                        }
                        title="Manage"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        className="bg-green-500 hover:bg-green-700"
                        size="sm"
                        onClick={() =>
                          router.push(`/admin/courses/${course.slug}`)
                        }
                        title="Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        // onClick={() => handleDelete(course.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
