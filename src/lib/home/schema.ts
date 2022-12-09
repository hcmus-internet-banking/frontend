import { z } from "zod";

export const createRecipientSchema = z.object({
  accountNumber: z
    .string()
    .min(1, { message: "Account number is shorter than 1 character" }),
  mnemonicName: z
    .string()
    .max(50, { message: "Mnemonic name is longer than 50 characters" })
    .optional(),
  isInternalBank: z
    .preprocess((value) => value === "true", z.boolean())
    .default(true),
});
