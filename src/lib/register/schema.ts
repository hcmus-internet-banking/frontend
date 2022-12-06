import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    repassword: z.string().min(8),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
  })
  .superRefine((data) => {
    if (data.password !== data.repassword) {
      return {
        path: ["repassword"],
        message: "Passwords do not match",
      };
    }
  });
