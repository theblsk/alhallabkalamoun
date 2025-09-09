"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useCart } from "../contexts/CartContext"

interface CheckoutModalProps {
  onClose: () => void
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { t } = useLanguage()
  const { items, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupTime: "today",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Order placed successfully! We will contact you shortly.")
    clearCart()
    setIsSubmitting(false)
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/20 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-modal-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b animate-fade-in-down">
          <h2 className="text-2xl font-bold text-navy-900">{t("checkout.title")}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Order Summary */}
          <div className="mb-8 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-100 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-semibold text-gold-600">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 text-lg font-bold animate-scale-in">
                <span>{t("cart.total")}</span>
                <span className="text-gold-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold text-navy-900 mb-4">{t("checkout.customer.info")}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <label className="block text-sm font-medium text-navy-700 mb-2">{t("checkout.name")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <label className="block text-sm font-medium text-navy-700 mb-2">{t("checkout.phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="md:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <label className="block text-sm font-medium text-navy-700 mb-2">{t("checkout.email")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Pickup Time */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <label className="block text-sm font-medium text-navy-700 mb-2">{t("checkout.pickup.time")}</label>
            <select
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200"
            >
              <option value="today">{t("checkout.today")}</option>
              <option value="tomorrow">{t("checkout.tomorrow")}</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
              disabled={isSubmitting}
            >
              {t("checkout.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-hallab-blue hover:bg-navy-800 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Processing...
                </>
              ) : (
                t("checkout.place.order")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
