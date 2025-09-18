"use client"

import { useState, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { Loader2, Lock } from "lucide-react"
import { completeProfileAction } from "../app/[locale]/complete-profile/action"

interface CompleteProfileProps {
  userEmail: string
  onComplete?: () => void
}

export default function CompleteProfile({ userEmail, onComplete }: CompleteProfileProps) {
  const t = useTranslations("completeProfile")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when user starts typing
    if (error) setError(null)
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: []
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    startTransition(async () => {
      try {
        const formDataToSubmit = new FormData()
        formDataToSubmit.append("firstName", formData.firstName)
        formDataToSubmit.append("lastName", formData.lastName)
        formDataToSubmit.append("phoneNumber", formData.phoneNumber)
        formDataToSubmit.append("email", userEmail)

        const result = await completeProfileAction(formDataToSubmit)

        if (!result.success) {
          setError(result.error || t("errors.generic"))
          if (result.fieldErrors) {
            setFieldErrors(result.fieldErrors)
          }
          return
        }

        // Success - call onComplete callback if provided
        if (onComplete) {
          onComplete()
        } else {
          // Redirect to home page
          router.push("/")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : t("errors.generic"))
      }
    })
  }

  const isFormValid = formData.firstName.trim() && 
                     formData.lastName.trim() && 
                     formData.phoneNumber.trim()

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-brown-900">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-brown-700">
            {t("subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-brown-800">
                {t("firstName")} *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={t("firstNamePlaceholder")}
                required
                className={`border-brown-300 focus:border-brown-500 ${
                  fieldErrors.firstName ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {fieldErrors.firstName && (
                <p className="text-sm text-red-600">{fieldErrors.firstName[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-brown-800">
                {t("lastName")} *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={t("lastNamePlaceholder")}
                required
                className={`border-brown-300 focus:border-brown-500 ${
                  fieldErrors.lastName ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {fieldErrors.lastName && (
                <p className="text-sm text-red-600">{fieldErrors.lastName[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-brown-800">
                {t("phoneNumber")} *
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder={t("phoneNumberPlaceholder")}
                required
                className={`border-brown-300 focus:border-brown-500 ${
                  fieldErrors.phoneNumber ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {fieldErrors.phoneNumber && (
                <p className="text-sm text-red-600">{fieldErrors.phoneNumber[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-brown-800">
                {t("email")} *
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userEmail}
                  disabled
                  className="border-brown-300 bg-gray-100 text-gray-600 cursor-not-allowed pr-10"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">{t("emailLocked")}</p>
              {fieldErrors.email && (
                <p className="text-sm text-red-600">{fieldErrors.email[0]}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isPending}
              className="w-full bg-brown-600 hover:bg-brown-700 text-white"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("saving")}
                </>
              ) : (
                t("completeProfile")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
