import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email must be a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
