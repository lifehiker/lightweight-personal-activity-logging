import { z } from "zod";

export const logEntrySchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  author: z.string().trim().max(160).optional().or(z.literal("")),
  loggedAt: z.string().min(1, "Date is required"),
  pagesRead: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : undefined))
    .refine((value) => value === undefined || (Number.isInteger(value) && value >= 0), {
      message: "Pages must be a positive number",
    }),
  rating: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : undefined))
    .refine((value) => value === undefined || (Number.isInteger(value) && value >= 1 && value <= 5), {
      message: "Rating must be 1 to 5",
    }),
  note: z.string().trim().max(600).optional().or(z.literal("")),
});

export type LogEntryInput = z.infer<typeof logEntrySchema>;
