import { z } from "zod";

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(6, "OTP must be 6 digits.")
    .max(6, "OTP must be 6 digits.")
    .regex(/^\d+$/, "OTP must contain only numbers."),
});