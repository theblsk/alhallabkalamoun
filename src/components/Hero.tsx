"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

export default function Hero() {
  const tHero = useTranslations('hero')
  const tFranchise = useTranslations('franchise')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts and DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative bg-gradient-to-br from-navy-50 to-navy-100 py-20 gpu-accelerated">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div
              className={`text-sm md:text-base text-navy-600 font-medium transition-all duration-300 ${
                isLoaded ? "animate-fade-in-up-optimized" : "opacity-0 translate-y-5"
              }`}
            >
              {tFranchise("name")} - {tHero("branch.location")}
            </div>
            <h1
              className={`text-4xl md:text-6xl font-bold text-navy-900 leading-tight transition-all duration-300 ${
                isLoaded ? "animate-stagger-fast-1" : "opacity-0 translate-y-5"
              }`}
            >
              {tHero("title")}
            </h1>
            <p
              className={`text-lg text-navy-700 leading-relaxed transition-all duration-300 ${
                isLoaded ? "animate-stagger-fast-2" : "opacity-0 translate-y-5"
              }`}
            >
              {tHero("subtitle")}
            </p>
            <button
              onClick={scrollToMenu}
              className={`bg-hallab-blue hover:bg-navy-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl gpu-accelerated ${
                isLoaded ? "animate-stagger-fast-3" : "opacity-0 translate-y-5"
              }`}
            >
              {tHero("cta")}
            </button>
          </div>

          {/* Hero Image */}
          <div
            className={`relative transition-all duration-300 ${
              isLoaded ? "animate-slide-in-right-optimized" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="gpu-accelerated">
                <Image
                  src="https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Lebanese Baklava"
                  width={250}
                  height={250}
                  className="rounded-lg shadow-lg object-cover aspect-square transition-transform duration-300 hover:scale-105 gpu-accelerated"
                  priority
                  loading="eager"
                />
              </div>
              <div className="gpu-accelerated">
                <Image
                  src="https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Lebanese Sweets"
                  width={250}
                  height={250}
                  className="rounded-lg shadow-lg object-cover mt-8 aspect-square transition-transform duration-300 hover:scale-105 gpu-accelerated"
                  priority
                  loading="eager"
                />
              </div>
            </div>
            <div
              className={`absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg gpu-accelerated transition-all duration-300 ${
                isLoaded ? "animate-stagger-fast-4" : "opacity-0 scale-95"
              }`}
            >
              <div className="text-2xl font-bold text-gold-600">Since 1881</div>
              <div className="text-sm text-navy-600">Traditional Recipe</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
