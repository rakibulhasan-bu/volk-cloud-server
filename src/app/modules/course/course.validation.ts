import { z } from "zod";

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3),
    instructor: z.string().trim().min(3),
    categoryId: z.string(),
    price: z.number().nonnegative(),
    tags: z.array(
      z.object({
        name: z.string().trim().min(3),
        isDeleted: z.boolean().optional(),
      }),
    ),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string().trim().min(2).max(50),
    provider: z.string().trim(),
    details: z.object({
      level: z.enum(["Beginner", "Intermediate", "Advanced"]),
      description: z.string().trim().min(10),
    }),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).optional(),
    instructor: z.string().trim().min(3).optional(),
    categoryId: z.string().optional(),
    price: z.number().nonnegative().optional(),
    tags: z
      .array(
        z.object({
          name: z.string().trim().min(3).optional(),
          isDeleted: z.boolean().optional(),
        }),
      )
      .optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().trim().min(2).max(50).optional(),
    provider: z.string().trim().optional(),
    details: z
      .object({
        level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
        description: z.string().trim().min(10).optional(),
      })
      .optional(),
  }),
});

export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
