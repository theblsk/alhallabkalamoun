"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { Users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { completeProfileSchema } from "@/lib/validations"
import { getLocale } from "next-intl/server"

export async function completeProfileAction(formData: FormData) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    const locale = await getLocale()
    if (!userId) {
      redirect(`/${locale}/sign-in`)
    }

    // Get email from Clerk session
    const sessionEmail = user?.emailAddresses[0].emailAddress as string | undefined;
    if (!sessionEmail) {
      redirect(`/${locale}/sign-in`)
    }

    // Extract form data
    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
    }

    // Validate that the email matches the logged-in user
    if (rawData.email !== sessionEmail) {
      return {
        success: false,
        error: "Email does not match your account"
      }
    }

    // Validate with Zod schema
    const validationResult = completeProfileSchema.safeParse(rawData)
    
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]
      const fieldErrors: Record<string, string[]> = {}
      
      validationResult.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          const field = issue.path[0] as string
          if (!fieldErrors[field]) {
            fieldErrors[field] = []
          }
          fieldErrors[field].push(issue.message)
        }
      })
      
      return {
        success: false,
        error: firstError.message,
        fieldErrors
      }
    }

    const { firstName, lastName, phoneNumber, email } = validationResult.data

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.id, userId))
      .limit(1)

    if (existingUser.length > 0) {
      return {
        success: false,
        error: "User profile already exists"
      }
    }

    // Check if email is already taken by another user
    const existingEmail = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email))
      .limit(1)

    if (existingEmail.length > 0) {
      return {
        success: false,
        error: "Email already in use"
      }
    }

    // Create user with CUSTOMER role only (no ADMIN or MANAGER)
    const newUser = await db
      .insert(Users)
      .values({
        id: userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        role: "CUSTOMER", // Only allow CUSTOMER role
      })
      .returning()

    return {
      success: true,
      user: newUser[0]
    }

  } catch (error) {
    console.error("Error creating user profile:", error)
    return {
      success: false,
      error: "Internal server error"
    }
  }
}
