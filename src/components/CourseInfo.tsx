"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICourse } from "@/types";
import Image from "next/image";
import { courseUpdateSchema } from "@/validation/addCourse.validation";
import { useUpdateCourseMutation } from "@/redux/api/courseApi";
import { Loader } from "lucide-react";

type CourseFormProps = {
  course: ICourse;
};

const CourseInfo = ({ course }: CourseFormProps) => {
  const [updateCourse, { isLoading: updating }] = useUpdateCourseMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    course.thumbnail
  );
  const [coverPreview, setCoverPreview] = useState<string>(course.coverPhoto);

  const form = useForm<z.infer<typeof courseUpdateSchema>>({
    resolver: zodResolver(courseUpdateSchema),
    defaultValues: {
      title: course.title,
      price: course.price,
      discountedPrice: course.discountedPrice,
      description: course.description,
      duration: course.duration,
      totalSeat: course.totalSeat,
      tags: course.tags.join(", "),
      learningPoints: course.learningPoints.join(", "),
      requirements: course.requirements.join(", "),
      status: course.status as "published" | "draft",
    },
  });

  const onSubmit = async (data: z.infer<typeof courseUpdateSchema>) => {
    try {
      const formData = new FormData();

      // Build single data object for all string/number/array fields
      const payload = {
        title: data.title,
        price: data.price,
        discountedPrice: data.discountedPrice,
        description: data.description,
        duration: data.duration,
        totalSeat: data.totalSeat,
        status: data.status,
        tags: data.tags?.split(",").map((t) => t.trim()) || [],
        learningPoints:
          data.learningPoints?.split(",").map((t) => t.trim()) || [],
        requirements: data.requirements?.split(",").map((t) => t.trim()) || [],
      };

      // Append JSON string as single 'data' key
      formData.append("data", JSON.stringify(payload));

      // Append files if selected
      if (data.thumbnail instanceof File) {
        formData.append("thumbnail", data.thumbnail);
      }
      if (data.coverPhoto instanceof File) {
        formData.append("coverPhoto", data.coverPhoto);
      }

      // Send FormData
      await updateCourse({ id: course.id, data: formData });

      toast.success("Course updated successfully!");
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Course Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status as select */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discounted Price */}
          <FormField
            control={form.control}
            name="discountedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discounted Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Seats */}
          <FormField
            control={form.control}
            name="totalSeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Seats</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail File Upload */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setThumbnailPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
                {thumbnailPreview && (
                  <Image
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    height={300}
                    width={300}
                    className="mt-2 w-full size-48 md:w-auto object-cover rounded-md border"
                  />
                )}
              </FormItem>
            )}
          />

          {/* Cover Photo File Upload */}
          <FormField
            control={form.control}
            name="coverPhoto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Photo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setCoverPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
                {coverPreview && (
                  <Image
                    src={coverPreview}
                    alt="Cover Preview"
                    height={300}
                    width={300}
                    className="mt-2 w-full size-48 md:w-auto object-cover rounded-md border"
                  />
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Course Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={updating}
          type="submit"
          className="mt-4 flex items-center"
        >
          {updating ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> Saving...
            </span>
          ) : (
            <span>Save Changes</span>
          )}
        </Button>
      </form>
    </Form>
  );
};
export default CourseInfo;
