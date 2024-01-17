import { z } from "zod";

const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number(),
    review: z.string().trim().min(3),
  }),
});

export const reviewValidation = { reviewValidationSchema };
