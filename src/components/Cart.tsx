"use client"

import { X, Plus, Minus, Trash2 } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useCart } from "../contexts/CartContext"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface CartProps {
  onClose: () => void
  onCheckout: () => void
}

export default function Cart({ onClose, onCheckout }: CartProps) {
  const tCart = useTranslations('cart')
  const { items, updateQuantity, removeItem, totalPrice } = useCart()

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/20 flex justify-end z-50 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-md h-full overflow-y-auto shadow-2xl border-l border-white/20 animate-slide-in-right">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white animate-fade-in-down">
          <h2 className="text-2xl font-bold text-navy-900">{tCart("title")}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 animate-fade-in-up">
              <div className="text-gray-400 mb-4 animate-bounce">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 16a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{tCart("empty")}</p>
              <button
                onClick={onClose}
                className="text-gold-600 hover:text-gold-700 font-semibold transition-colors duration-200"
              >
                {tCart("continue.shopping")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 transition-all duration-300 hover:shadow-md animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy-900 mb-1 transition-colors duration-200">{item.name}</h3>
                      <p className="text-gold-600 font-bold mb-2">${item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 bg-gray-100 hover:bg-gray-200 rounded transition-all duration-200 hover:scale-110"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-semibold min-w-[2rem] text-center transition-all duration-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 bg-gray-100 hover:bg-gray-200 rounded transition-all duration-200 hover:scale-110"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition-all duration-200 hover:scale-110"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 sticky bottom-0 bg-white animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-navy-900">{tCart("total")}</span>
              <span className="text-2xl font-bold text-gold-600 animate-pulse">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-hallab-blue hover:bg-navy-800 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {tCart("checkout")}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
