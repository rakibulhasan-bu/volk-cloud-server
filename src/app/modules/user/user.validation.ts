import { z } from "zod";

const registerUserValidation = z.object({
  body: z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]),
  }),
});

export const userValidations = { registerUserValidation };
