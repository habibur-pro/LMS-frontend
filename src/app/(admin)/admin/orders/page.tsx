"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IOrder, IUser } from "@/types";
import { Edit, Eye, Filter, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useGetAllStudentsQuery } from "@/redux/api/userApi";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import Image from "next/image";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: orderRes } = useGetAllOrdersQuery("");
  const orders: Array<IOrder> = orderRes?.data;

  const filteredData = useMemo(() => {
    const filtered = orders?.filter((order) => {
      const matchesSearch =
        order?.id === searchTerm ||
        order.user?.email === searchTerm ||
        order?.user.phone === searchTerm ||
        order?.course?.title?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
    return filtered;
  }, [searchTerm, orders]);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Order</h1>
        <p className="text-sm text-muted-foreground">All orders</p>
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
                  placeholder="Search by orderId, email, phone or course title"
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
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {[
                    "Course",
                    "Id",
                    "Name",
                    "Email",
                    "Phone",
                    "Status",
                    "Payment Status",
                    "Date",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData?.map((order, index) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {/* Course */}
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <Image
                        src={order?.course?.thumbnail}
                        width={50}
                        height={50}
                        alt={order?.course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {order?.course?.title}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">{order?.id || "-"}</td>
                    <td className="px-6 py-4">{order?.user?.name || "-"}</td>
                    <td className="px-6 py-4">{order?.user?.email || "-"}</td>
                    <td className="px-6 py-4">{order?.user?.phone || "-"}</td>
                    <td className="px-6 py-4">{order?.status || "-"}</td>
                    <td className="px-6 py-4">
                      {order?.payment?.status || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {moment(order.createdAt).format("DD-MM-YYYY")}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log("View", order.id)}
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => console.log("Edit", order.id)}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
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

export default Orders;
