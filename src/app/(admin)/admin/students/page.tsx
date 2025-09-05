"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "@/types";
import { Edit, Eye, Filter, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useGetAllStudentsQuery } from "@/redux/api/userApi";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: studentRes } = useGetAllStudentsQuery("");
  const students: Array<IUser> = studentRes?.data;

  const filteredData = useMemo(() => {
    const filtered = students?.filter((student) => {
      const matchesSearch =
        student?.email === searchTerm ||
        student?.id === searchTerm ||
        student?.phone === searchTerm ||
        student?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
    return filtered;
  }, [searchTerm, students]);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Students</h1>
        <p className="text-sm text-muted-foreground">All students</p>
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
                  placeholder="Search by id, email, phone or name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* table  */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 0">
                <tr>
                  {[
                    "No",
                    "Id",
                    "Name",
                    "Email",
                    "Phone",
                    "JoinedAt",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white  divide-y divide-gray-200 ">
                {filteredData?.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50 ">
                    {/* Course */}
                    <td className="px-6 py-4 flex items-center space-x-3">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">{student?.id || "-"}</td>
                    <td className="px-6 py-4">{student?.name || "-"}</td>
                    <td className="px-6 py-4">{student?.email || "-"}</td>
                    <td className="px-6 py-4">{student?.phone || "-"}</td>
                    <td className="px-6 py-4 text-sm ">
                      {moment(student.createdAt).format("DD-MM-YYYY")}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log("View", student.id)}
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log("Edit", student.id)}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      {/* <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/courses/${student.slug}`)}
                        title="Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button> */}
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

export default Students;
