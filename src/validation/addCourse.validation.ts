import { CourseStatus, LectureContentType } from "@/enum";
import { boolean, z } from "zod";

const lectureSchema = z.object({
  title: z.string().min(1, "Lecture title is required"),
  content: z.string().min(1, "Content is required"),
  contentType: z.enum(
    [LectureContentType.Video, LectureContentType.Text, LectureContentType.Pdf],
    {
      message: "Content type is required",
    }
  ),
});

const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  lectures: z.array(lectureSchema).min(1, "At least one lecture is required"),
  isFree: boolean(),
});

export const CourseFormSchema = z
  .object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
    thumbnail: z.instanceof(File).nullable(),
    coverPhoto: z.instanceof(File).nullable(),
    price: z.number().positive("Price must be greater than 0"),
    discountedPrice: z.number().optional(),
    duration: z.number().int().positive("Duration must be positive"),
    totalSeat: z.number().int().min(0, "Available seats must be at least 0"),

    tags: z.array(z.string().min(1)).default([]),
    learningPoints: z.array(z.string().min(1)).default([]),
    requirements: z.array(z.string().min(1)).default([]),

    status: z.enum([
      CourseStatus.DRAFTED,
      CourseStatus.UPCOMING,
      CourseStatus.PUBLISHED,
      CourseStatus.UNPUBLISHED,
    ]),

    modules: z.array(moduleSchema),
  })
  .superRefine((val, ctx) => {
    if (val.discountedPrice && val.discountedPrice > val.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Discounted price cannot exceed price",
        path: ["discountedPrice"],
      });
    }
  });

export type CourseFormValues = z.infer<typeof CourseFormSchema>;

export const courseUpdateSchema = z.object({
  title: z.string().min(2),
  price: z.number().min(0),
  discountedPrice: z.number().min(0),
  description: z.string().min(5),
  thumbnail: z.any().optional(), // file input
  coverPhoto: z.any().optional(), // file input
  duration: z.number().min(1),
  totalSeat: z.number().min(1),
  tags: z.string().optional(),
  learningPoints: z.string().optional(),
  requirements: z.string().optional(),
  status: z.enum(["published", "draft"]),
});
