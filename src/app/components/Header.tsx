"use client"

import { ShoppingCart, Globe } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useCart } from "../contexts/CartContext"

interface HeaderProps {
  onCartClick: () => void
}

export default function Header({ onCartClick }: HeaderProps) {
  const { t, language, setLanguage, isRTL } = useLanguage()
  const { totalItems } = useCart()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <header className="bg-hallab-blue shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white">{t("franchise.name")}</div>
            <div className="hidden md:block text-sm text-gold-400">{t("franchise.tagline")}</div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-200 hover:text-gold-400 transition-colors">
              {t("nav.home")}
            </a>
            <a href="#menu" className="text-gray-200 hover:text-gold-400 transition-colors">
              {t("nav.menu")}
            </a>
            <a href="#about" className="text-gray-200 hover:text-gold-400 transition-colors">
              {t("nav.about")}
            </a>
            <a href="#contact" className="text-gray-200 hover:text-gold-400 transition-colors">
              {t("nav.contact")}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-200 hover:text-gold-400 transition-colors"
              title="Change Language"
            >
              <Globe size={20} />
            </button>

            <button onClick={onCartClick} className="relative p-2 text-gray-200 hover:text-gold-400 transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
