/** @format */

import { z } from "zod";

export const resetPasswordSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers."),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 character")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character.",
    ),

  confirmPassword: z.string().min(1, "Please confirm your password"),


}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: "Password do not match",
        path: ["confirmPassword"],  
    }
)
