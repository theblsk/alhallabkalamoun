"use client"

import { useLanguage } from "../contexts/LanguageContext"
import Image from "next/image"
import { useTranslations } from "next-intl"

const menuItems = [
  {
    id: "baklawa-mixed",
    name: "item.baklawa.mixed",
    nameAr: "item.baklawa.mixed",
    description: "item.baklawa.mixed.desc",
    price: 18,
    availableToday: true,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "maamoul-dates",
    name: "item.maamoul.dates",
    nameAr: "item.maamoul.dates",
    description: "item.maamoul.dates.desc",
    price: 22,
    availableToday: false,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "knafeh-nabulsieh",
    name: "item.knafeh.nabulsieh",
    nameAr: "item.knafeh.nabulsieh",
    description: "item.knafeh.nabulsieh.desc",
    price: 16,
    availableToday: false,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "muhallabia-rose",
    name: "item.muhallabia.rose",
    nameAr: "item.muhallabia.rose",
    description: "item.muhallabia.rose.desc",
    price: 8,
    availableToday: true,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "halawet-jibn",
    name: "item.halawet.jibn",
    nameAr: "item.halawet.jibn",
    description: "item.halawet.jibn.desc",
    price: 14,
    availableToday: true,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "osmalieh",
    name: "item.osmalieh",
    nameAr: "item.osmalieh",
    description: "item.osmalieh.desc",
    price: 12,
    availableToday: true,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "baklawa-pistachios",
    name: "item.baklawa.pistachios",
    nameAr: "item.baklawa.pistachios",
    description: "item.baklawa.pistachios.desc",
    price: 25,
    availableToday: true,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "maamoul-walnuts",
    name: "item.maamoul.walnuts",
    nameAr: "item.maamoul.walnuts",
    description: "item.maamoul.walnuts.desc",
    price: 20,
    availableToday: false,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "aish-saraya",
    name: "item.aish.saraya",
    nameAr: "item.aish.saraya",
    description: "item.aish.saraya.desc",
    price: 15,
    availableToday: true,
    image:
      "https://images.unsplash.com/photo-1617806501553-d3a6a3a7b227?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

interface MenuProps {
  onItemClick: (item: any) => void
}

export default function Menu({ onItemClick }: MenuProps) {
  const tMenu = useTranslations('menu')
  const tItems = useTranslations('items')

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-navy-900 mb-4">{tMenu("title")}</h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">{tMenu("subtitle")}</p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden card-hover transition-all duration-300 border border-navy-200 flex flex-col animate-stagger-${
                (index % 9) + 1
              }`}
            >
              {/* Item Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={tItems(item.name + '.name')}
                  width={300}
                  height={250}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                {/* Availability Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 animate-scale-in ${
                    item.availableToday ? "bg-navy-600 text-white" : "bg-gold-500 text-white"
                  }`}
                >
                  {item.availableToday ? tMenu("available.today") : tMenu("order.tomorrow")}
                </div>
              </div>

              {/* Item Details */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-navy-900 transition-colors duration-200">{tItems(item.name + '.name')}</h3>
                  <span className="text-2xl font-bold text-gold-600 animate-pulse">${item.price}</span>
                </div>

                <p className="text-navy-700 mb-4 text-sm leading-relaxed flex-1 transition-colors duration-200">
                  {tItems(item.description)}
                </p>

                {!item.availableToday && (
                  <p className="text-gold-700 text-sm mb-4 font-medium animate-fade-in">{tMenu("ready.tomorrow")}</p>
                )}

                <button
                  onClick={() => onItemClick(item)}
                  className="w-full bg-navy-600 hover:bg-navy-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 mt-auto transform hover:scale-105 hover:shadow-lg"
                >
                  {tMenu("add.to.order")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
