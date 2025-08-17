import { Phone } from "lucide-react";
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(2, "invalid phone"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  isRemember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .nonempty("OTP is required")
    .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;
