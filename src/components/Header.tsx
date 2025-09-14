"use client"

import { ShoppingCart, Globe } from "lucide-react"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useCart } from "../contexts/CartContext"
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { cookies } from "next/headers"

interface HeaderProps {
  onCartClick: () => void
}

export default function Header({ onCartClick }: HeaderProps) {
  const { totalItems } = useCart()
  const tFranchise = useTranslations('franchise')
  const tNav = useTranslations('navbar')
  const tAuth = useTranslations('auth')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  
  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar'
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <header className="bg-hallab-blue shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white">{tFranchise("name")}</div>
            <div className="hidden md:block text-sm text-gold-400">{tFranchise("tagline")}</div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-200 hover:text-gold-400 transition-colors">
              {tNav("home")}
            </a>
            <a href="#menu" className="text-gray-200 hover:text-gold-400 transition-colors">
              {tNav("menu")}
            </a>
            <a href="#about" className="text-gray-200 hover:text-gold-400 transition-colors">
              {tNav("about")}
            </a>
            <a href="#contact" className="text-gray-200 hover:text-gold-400 transition-colors">
              {tNav("contact")}
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
                  {tAuth('signIn')}
                </button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl="/complete-profile" fallbackRedirectUrl="/complete-profile">
                <button className="inline-flex h-9 items-center rounded-full bg-gold-500 px-4 text-sm font-medium text-hallab-blue transition hover:bg-gold-400">
                  {tAuth('signUp')}
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <button className="inline-flex h-9 items-center rounded-full bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
                  {tAuth('signOut')}
                </button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}
