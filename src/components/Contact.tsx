"use client"

import { Phone, MapPin, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Contact() {
  const tContact = useTranslations('contact')
  const tFranchise = useTranslations('franchise')

  const handleCallClick = () => {
    window.open("tel:+96171600153", "_self")
  }

  return (
    <section id="contact" className="py-20 bg-navy-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up-optimized">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">{tContact("title")}</h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">{tContact("subtitle")}</p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Phone Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center card-hover animate-stagger-fast-1">
            <div className="w-16 h-16 bg-hallab-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">{tContact("phone")}</h3>
            <p className="text-navy-600 mb-4">{tContact("orders")}</p>
            <div className="text-2xl font-bold text-gold-600 mb-4" dir="ltr">
              +961 71 600 153
            </div>
            <button
              onClick={handleCallClick}
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {tContact("call.now")}
            </button>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center card-hover animate-stagger-fast-2">
            <div className="w-16 h-16 bg-hallab-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">{tContact("location")}</h3>
            <p className="text-navy-600 mb-4">{tContact("branch")}</p>
            <div className="text-lg font-semibold text-navy-800">Kalamoun, Lebanon</div>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center card-hover animate-stagger-fast-3">
            <div className="w-16 h-16 bg-hallab-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">{tContact("hours.label")}</h3>
            <p className="text-navy-600 mb-4">{tContact("hours.daily")}</p>
            <div className="text-sm text-gold-600 font-medium">Open Every Day</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-stagger-fast-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-navy-900 mb-4">
              {tFranchise("name")} - {tContact("branch")}
            </h3>
            <p className="text-navy-700 mb-6">{tFranchise("tagline")}</p>
            <button
              onClick={handleCallClick}
              className="bg-hallab-blue hover:bg-navy-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5 inline-block mr-2" />
              {tContact("call.now")}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
