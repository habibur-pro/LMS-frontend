"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  CourseFormSchema,
  type CourseFormValues,
} from "@/validation/addCourse.validation";
import BasicInfo from "../add course/BassicInfo";
import Media from "../add course/Media";
import PricingAndSeat from "../add course/PricingAndSeat";
import Tags from "../add course/Tags";
import LearningPoints from "./LearningPoints";
import Requirements from "../add course/Requirements";
import Modules from "../add course/Modules";
import { CourseStatus } from "@/enum";
import { useAddCourseMutation } from "@/redux/api/courseApi";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
  const [addCourse] = useAddCourseMutation();
  const router = useRouter();
  const form = useForm<CourseFormValues>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: null,
      coverPhoto: null,
      price: 0,
      discountedPrice: 0,
      duration: 0,
      totalSeat: 0,
      tags: [],
      learningPoints: [],
      requirements: [],
      status: CourseStatus.DRAFTED,
      modules: [],
    },
    mode: "onSubmit",
  });
  const onSubmit = async (data: FieldValues) => {
    try {
      console.log("data is", data);
      const { coverPhoto, thumbnail, ...rest } = data;
      const formData = new FormData();
      formData.append("coverPhoto", coverPhoto);
      formData.append("thumbnail", thumbnail);
      formData.append("data", JSON.stringify(rest));
      await addCourse(formData).unwrap();
      router.push("/admin/courses");
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "something went wrong"
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Add New Course</h1>
        <p className="text-sm text-muted-foreground">
          Create a new course with modules and lectures
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <BasicInfo form={form} />
          <Media form={form} />
          <PricingAndSeat form={form} />
          <Tags form={form} />
          <LearningPoints form={form} />
          <Requirements form={form} />
          <Modules form={form} />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => history.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
