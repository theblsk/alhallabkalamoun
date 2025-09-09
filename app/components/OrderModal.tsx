"use client"

import { useState } from "react"
import { X, Plus, Minus } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useCart } from "../contexts/CartContext"
import Image from "next/image"

interface OrderModalProps {
  item: any
  onClose: () => void
}

export default function OrderModal({ item, onClose }: OrderModalProps) {
  const { t } = useLanguage()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: t(item.name),
      nameAr: t(item.nameAr),
      price: item.price,
      availableToday: item.availableToday,
      image: item.image,
      quantity,
    })
    onClose()
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/20 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-modal-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b animate-fade-in-down">
          <h2 className="text-2xl font-bold text-navy-900">{t(item.name)}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 animate-fade-in-up">
          {/* Item Image */}
          <div className="overflow-hidden rounded-lg mb-4">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={t(item.name)}
              width={400}
              height={250}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Availability Status */}
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-scale-in ${
              item.availableToday ? "bg-navy-100 text-hallab-blue" : "bg-gold-100 text-gold-800"
            }`}
          >
            {item.availableToday ? t("menu.available.today") : t("menu.ready.tomorrow")}
          </div>

          {/* Description */}
          <p className="text-navy-700 mb-6 leading-relaxed animate-fade-in">{t(item.description)}</p>

          {/* Price */}
          <div className="text-3xl font-bold text-gold-600 mb-6 animate-bounce">${item.price}</div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-6 animate-fade-in-up">
            <span className="text-lg font-semibold text-navy-900">{t("quantity")}</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={decrementQuantity}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-bold text-navy-900 min-w-[3rem] text-center transition-all duration-200">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center mb-6 p-4 bg-navy-50 rounded-lg animate-fade-in">
            <span className="text-lg font-semibold text-navy-900">{t("price")}</span>
            <span className="text-2xl font-bold text-gold-600">${(item.price * quantity).toFixed(2)}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-hallab-blue hover:bg-navy-800 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up"
          >
            {t("add.to.cart")}
          </button>
        </div>
      </div>
    </div>
  )
}
