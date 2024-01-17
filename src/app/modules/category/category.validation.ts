import { z } from "zod";

const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2),
  }),
});

export const categoryValidation = {
  categoryValidationSchema,
};
