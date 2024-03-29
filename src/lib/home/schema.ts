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

export const createInternalTransferSchema = z.object({
  to: z.preprocess(
    (value) => Number(value),
    z
      .number()
      .min(1000000000, { message: "Field is shorter than 10 character" })
  ),
  amount: z.preprocess(
    (value) => Number(value),
    z.number().min(1000, { message: "Amount should be more than 1000" })
  ),
  message: z
    .string()
    .max(50, { message: "Description is longer than 50 characters" })
    .optional(),
  token: z.string(),
  payer: z.enum(["sender", "receiver"]),
});

export const createInvoiceSchema = z.object({
  accountNumber: z
    .string()
    .min(1, { message: "Account number is shorter than 1 character" }),
  amount: z.preprocess(
    (value) => Number(value),
    z.number().min(1000, { message: "Amount should be more than 1000" })
  ),
  isInternalBank: z
    .preprocess((value) => value === "true", z.boolean())
    .default(true),
  message: z
    .string()
    .max(50, { message: "Description is longer than 50 characters" })
    .optional(),
});

export const createExternalTransferSchema = z.object({
  to: z.preprocess((value) => Number(value), z.number()),
  amount: z.preprocess(
    (value) => Number(value),
    z.number().min(1000, { message: "Amount should be more than 1000" })
  ),
  message: z
    .string()
    .max(50, { message: "Description is longer than 50 characters" })
    .optional(),
  token: z.string(),
  payer: z.enum(["sender", "receiver"]),
});

export const paymentInvoiceSchema = z.object({
  token: z.string(),
});

// export const createInternalTransferSchema = z.object({
//   to: z.preprocess(
//     (value) => Number(value),
//     z
//       .number()
//       .min(1000000000, { message: "Field is shorter than 10 character" })
//   ),
//   amount: z.preprocess(
//     (value) => Number(value),
//     z.number().min(1000, { message: "Amount should be more than 1000" })
//   ),
//   message: z
//     .string()
//     .max(50, { message: "Description is longer than 50 characters" })
//     .optional(),
//   token: z.string(),
//   payer: z.enum(["sender", "receiver"]),
// });
