import { z } from "zod"

export const completeProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .trim(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number format")
    .trim(),
  email: z
    .email("Invalid email format")
    .min(1, "Email is required")
    .max(100, "Email must be less than 100 characters")
    .toLowerCase()
    .trim(),
})

export type CompleteProfileInput = z.infer<typeof completeProfileSchema>
