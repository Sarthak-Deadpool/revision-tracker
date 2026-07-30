/** @format */

import { z } from "zod";

const subjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Subject name must be at least 2 characters long.")
    .max(50, "Subject name cannot exceed 50 characters"),

  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code.")
    .optional(),

  description: z
    .string()
    .trim()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
});

export default subjectSchema;
