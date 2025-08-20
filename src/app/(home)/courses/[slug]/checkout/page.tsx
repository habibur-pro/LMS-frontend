"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

import type { Course } from "@/types/course";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Loader2,
  CheckCircle,
  ShoppingCart,
  Loader,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sampleCourses } from "@/lib/sample-course-data";
import { useGetCourseQuery } from "@/redux/api/courseApi";
import { usePlaceOrderMutation } from "@/redux/api/orderApi";
import { useSession } from "next-auth/react";
import { ICourse } from "@/types";
import { toast } from "sonner";

export default function PurchasePage() {
  const params = useParams();
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;
  // console.log("user", user);
  const [placeOrder, { isLoading: orderLoading }] = usePlaceOrderMutation();
  const slug = params.slug as string;
  const { data: courseRes, isLoading } = useGetCourseQuery(slug);
  const course: ICourse = courseRes?.data;
  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder({
        courseId: course.id,
        userId: user?.id,
      }).unwrap();

      const url = response?.data?.url;
      router.push(url);
    } catch (error: any) {
      console.log("error", error);
      toast.error(
        error?.message || error?.data?.message || "something went wrong!"
      );
    }
  };

  if (isLoading || !course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="container mx-auto md:max-w-xl">
        <div className=" ">
          {/* Course Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Course Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={course?.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Course Price</span>
                  <span className="font-semibold">{course.price}</span>
                </div>
                {course?.discountedPrice && (
                  <div className="flex justify-between">
                    <span>Discounted Price</span>
                    <span className="font-semibold">
                      {course.discountedPrice}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{course?.discountedPrice || course?.price}</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span>Secure payment with 30-day money-back guarantee</span>
                </div>
              </div>
              <Button
                onClick={handlePlaceOrder}
                disabled={orderLoading}
                size="lg"
                className="w-full mb-4"
              >
                {orderLoading && <Loader className="w-5 h-4 animate-spin" />}
                <ShoppingCart className="w-4 h-4 mr-2" />
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
