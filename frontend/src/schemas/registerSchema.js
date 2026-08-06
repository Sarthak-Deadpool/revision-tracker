import { z } from "zod";

 const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>/?]{8,20}$/;


export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .max(30, "Full name cannot exceed 30 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z.string().regex(
  passwordRegex,
  "Password must be 8-20 characters long and include uppercase, lowercase, number, and special character.",
),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default registerSchema;