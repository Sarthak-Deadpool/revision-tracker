/** @format */

import { z } from "zod";

const topicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Topic name must be at least 2 characters long")
    .max(50, "Topic name cannot exceed 50 characters"),

  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    required_error: "Defficulty is required.",
  }),

  subject: z
  .string()
  .trim()
  .min(1, "Please select a subject"),

  notes: z
    .string()
    .trim()
    .max(1000, "Notes must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
});

export default topicSchema;
