"use client"

import { useRouter, usePathname } from "@/i18n/navigation"

interface LanguageSelectorProps {
  onClose: () => void
}

export default function LanguageSelector({ onClose }: LanguageSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageSelect = (lang: "en" | "ar") => {
    // Switch locale using next-intl's navigation API
    router.replace(pathname, { locale: lang })
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl border border-white/20 animate-modal-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-brown-800 animate-fade-in-down">Choose Your Language</h2>
        <p className="text-brown-600 mb-8 animate-fade-in-up">اختر لغتك المفضلة</p>

        <div className="space-y-4">
          <button
            onClick={() => handleLanguageSelect("en")}
            className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-2xl">🇺🇸</span>
            English
          </button>

          <button
            onClick={() => handleLanguageSelect("ar")}
            className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-2xl">🇱🇧</span>
            العربية
          </button>
        </div>
      </div>
    </div>
  )
}
