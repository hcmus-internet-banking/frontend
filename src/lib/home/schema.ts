import { z } from "zod";

export const createRecipientSchema = z.object({
  accountNumber: z
    .string()
    .min(1, { message: "Account number is shorter than 1 character" }),
  mnemonicName: z
    .string()
    .min(1, { message: "Mnemonic name is shorter than 1 character" })
    .max(50, { message: "Mnemonic name is longer than 50 characters" }),
});
