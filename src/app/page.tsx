"use client"

import { useState, useEffect } from "react"
import { LanguageProvider } from "./contexts/LanguageContext"
import { CartProvider } from "./contexts/CartContext"
import LanguageSelector from "./components/LanguageSelector"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Menu from "./components/Menu"
import Cart from "./components/Cart"
import OrderModal from "./components/OrderModal"
import CheckoutModal from "./components/CheckoutModal"
import Contact from "./components/Contact"

export default function Home() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    // Show language selector on first visit
    const hasVisited = localStorage.getItem("hasVisited")
    if (!hasVisited) {
      setShowLanguageSelector(true)
      localStorage.setItem("hasVisited", "true")
    }
  }, [])

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-cream-50">
          {showLanguageSelector && <LanguageSelector onClose={() => setShowLanguageSelector(false)} />}

          <Header onCartClick={() => setShowCart(true)} />
          <Hero />
          <Menu onItemClick={setSelectedItem} />
          <Contact />

          {selectedItem && <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

          {showCart && (
            <Cart
              onClose={() => setShowCart(false)}
              onCheckout={() => {
                setShowCart(false)
                setShowCheckout(true)
              }}
            />
          )}

          {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
        </div>
      </CartProvider>
    </LanguageProvider>
  )
}
