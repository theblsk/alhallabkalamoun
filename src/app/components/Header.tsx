"use client"

import { ShoppingCart, Globe } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useCart } from "../contexts/CartContext"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

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

            <SignedOut>
              <SignInButton mode="modal">
                <button className="hidden sm:inline-flex h-9 items-center rounded-full bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
                  {t('auth.signIn')}
                </button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl="/complete-profile" fallbackRedirectUrl="/complete-profile">
                <button className="inline-flex h-9 items-center rounded-full bg-gold-500 px-4 text-sm font-medium text-hallab-blue transition hover:bg-gold-400">
                  {t('auth.signUp')}
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'ring-2 ring-gold-500',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}
