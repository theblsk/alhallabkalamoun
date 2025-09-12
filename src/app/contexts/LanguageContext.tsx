"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "franchise.name": "Refaat Al Hallab",
    "franchise.tagline": "Authentic Lebanese Sweets Since 1881",
    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cart.items": "items",

    // Auth
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",

    // Hero
    "hero.title": "Taste the Tradition of Lebanon",
    "hero.subtitle":
      "Discover our exquisite collection of authentic Lebanese sweets, crafted with love and tradition passed down through generations.",
    "hero.cta": "Explore Our Menu",
    "hero.branch.location": "The Refaat Hallab branch in Kalamoun",

    // Menu
    "menu.title": "Our Delicious Menu",
    "menu.subtitle": "Handcrafted Lebanese sweets made with the finest ingredients",
    "menu.available.today": "Available Today",
    "menu.order.tomorrow": "Order Tomorrow",
    "menu.ready.tomorrow": "Ready Tomorrow by 2 PM",
    "menu.add.to.order": "Add to Order",

    // Cart
    "cart.title": "Your Order",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Proceed to Checkout",
    "cart.continue.shopping": "Continue Shopping",

    // Checkout
    "checkout.title": "Order Details",
    "checkout.customer.info": "Customer Information",
    "checkout.name": "Full Name",
    "checkout.phone": "Phone Number",
    "checkout.email": "Email Address",
    "checkout.pickup.time": "Pickup Time",
    "checkout.today": "Today",
    "checkout.tomorrow": "Tomorrow",
    "checkout.place.order": "Place Order",
    "checkout.cancel": "Cancel",

    // Items
    "item.knafeh": "Knafeh Nabulsieh",
    "item.knafeh.desc": "Traditional cheese knafeh with crispy shredded phyllo",
    "item.baklava": "Baklava Assorted",
    "item.baklava.desc": "Mix of pistachio, walnut, and cashew baklava",
    "item.muhallabia": "Muhallabia",
    "item.muhallabia.desc": "Creamy milk pudding with rose water",
    "item.maamoul": "Ma'amoul",
    "item.maamoul.desc": "Date and nut-filled cookies",
    "item.halawet": "Halawet El Jibn",
    "item.halawet.desc": "Sweet cheese rolls with cream",

    // New Items
    "item.baklawa.mixed": "Mixed Baklawa",
    "item.baklawa.mixed.desc": "Assorted baklawa with pistachios, walnuts, and almonds",
    "item.maamoul.dates": "Maamoul with Dates",
    "item.maamoul.dates.desc": "Traditional date-filled semolina cookies",
    "item.knafeh.nabulsieh": "Knafeh Nabulsieh",
    "item.knafeh.nabulsieh.desc": "Classic cheese knafeh with crispy shredded phyllo",
    "item.muhallabia.rose": "Rose Muhallabia",
    "item.muhallabia.rose.desc": "Creamy milk pudding infused with rose water",
    "item.halawet.jibn": "Halawet El Jibn",
    "item.halawet.jibn.desc": "Sweet cheese rolls with ashta cream",
    "item.osmalieh": "Osmalieh",
    "item.osmalieh.desc": "Crispy phyllo layers with cream and pistachios",
    "item.baklawa.pistachios": "Pistachio Baklawa",
    "item.baklawa.pistachios.desc": "Premium baklawa filled with finest Aleppo pistachios",
    "item.maamoul.walnuts": "Walnut Maamoul",
    "item.maamoul.walnuts.desc": "Buttery semolina cookies filled with spiced walnuts",
    "item.aish.saraya": "Aish El Saraya",
    "item.aish.saraya.desc": "Palace bread with cream and candied orange blossom",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with us for orders and inquiries",
    "contact.phone": "Phone",
    "contact.call.now": "Call Now",
    "contact.location": "Location",
    "contact.branch": "The Refaat Hallab branch in Kalamoun",
    "contact.hours": "Opening Hours",
    "contact.hours.daily": "Daily: 8:00 AM - 10:00 PM",
    "contact.orders": "For Orders & Inquiries",
  },
  ar: {
    // Header
    "franchise.name": "رفعت الحلاب",
    "franchise.tagline": "حلويات لبنانية أصيلة منذ ١٢٢١",
    "nav.home": "الرئيسية",
    "nav.menu": "القائمة",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "cart.items": "عنصر",

    // Auth
    "auth.signIn": "تسجيل الدخول",
    "auth.signUp": "إنشاء حساب",

    // Hero
    "hero.title": "تذوق تراث لبنان",
    "hero.subtitle": "اكتشف مجموعتنا الرائعة من الحلويات اللبنانية الأصيلة، المصنوعة بحب وتقاليد متوارثة عبر الأجيال.",
    "hero.cta": "استكشف قائمتنا",
    "hero.branch.location": "فرع رفعت الحلاب في القلمون",

    // Menu
    "menu.title": "قائمتنا اللذيذة",
    "menu.subtitle": "حلويات لبنانية مصنوعة يدوياً بأجود المكونات",
    "menu.available.today": "متوفر اليوم",
    "menu.order.tomorrow": "اطلب للغد",
    "menu.ready.tomorrow": "جاهز غداً بحلول الساعة ٢ ظهراً",
    "menu.add.to.order": "أضف للطلب",

    // Cart
    "cart.title": "طلبك",
    "cart.empty": "سلة التسوق فارغة",
    "cart.total": "المجموع",
    "cart.checkout": "إتمام الطلب",
    "cart.continue.shopping": "متابعة التسوق",

    // Checkout
    "checkout.title": "تفاصيل الطلب",
    "checkout.customer.info": "معلومات العميل",
    "checkout.name": "الاسم الكامل",
    "checkout.phone": "رقم الهاتف",
    "checkout.email": "البريد الإلكتروني",
    "checkout.pickup.time": "وقت الاستلام",
    "checkout.today": "اليوم",
    "checkout.tomorrow": "غداً",
    "checkout.place.order": "تأكيد الطلب",
    "checkout.cancel": "إلغاء",

    // Items
    "item.knafeh": "كنافة نابلسية",
    "item.knafeh.desc": "كنافة تقليدية بالجبن مع الشعيرية المقرمشة",
    "item.baklava": "بقلاوة متنوعة",
    "item.baklava.desc": "خليط من بقلاوة الفستق واللوز والكاجو",
    "item.muhallabia": "مهلبية",
    "item.muhallabia.desc": "حلوى كريمية بماء الورد",
    "item.maamoul": "معمول",
    "item.maamoul.desc": "كعك محشو بالتمر والمكسرات",
    "item.halawet": "حلاوة الجبن",
    "item.halawet.desc": "رولات الجبن الحلوة بالكريمة",

    // New Items
    "item.baklawa.mixed": "بقلاوة مشكلة",
    "item.baklawa.mixed.desc": "بقلاوة متنوعة بالفستق واللوز والجوز",
    "item.maamoul.dates": "معمول بالتمر",
    "item.maamoul.dates.desc": "كعك السميد التقليدي محشو بالتمر",
    "item.knafeh.nabulsieh": "كنافة نابلسية",
    "item.knafeh.nabulsieh.desc": "كنافة الجبن الكلاسيكية بالشعيرية المقرمشة",
    "item.muhallabia.rose": "مهلبية بماء الورد",
    "item.muhallabia.rose.desc": "حلوى كريمية بالحليب منكهة بماء الورد",
    "item.halawet.jibn": "حلاوة الجبن",
    "item.halawet.jibn.desc": "رولات الجبن الحلوة بكريمة العشطة",
    "item.osmalieh": "عثملية",
    "item.osmalieh.desc": "طبقات الفيلو المقرمشة بالكريمة والفستق",
    "item.baklawa.pistachios": "بقلاوة بالفستق",
    "item.baklawa.pistachios.desc": "بقلاوة فاخرة محشوة بأجود فستق حلبي",
    "item.maamoul.walnuts": "معمول بالجوز",
    "item.maamoul.walnuts.desc": "كعك السميد بالزبدة محشو بالجوز المتبل",
    "item.aish.saraya": "عيش السرايا",
    "item.aish.saraya.desc": "خبز القصر بالكريمة وزهر البرتقال المسكر",

    // Contact
    "contact.title": "اتصل بنا",
    "contact.subtitle": "تواصل معنا للطلبات والاستفسارات",
    "contact.phone": "الهاتف",
    "contact.call.now": "اتصل الآن",
    "contact.location": "الموقع",
    "contact.branch": "فرع رفعت الحلاب في القلمون",
    "contact.hours": "ساعات العمل",
    "contact.hours.daily": "يومياً: ٢:٠٠ صباحاً - ١٠:٠٠ مساءً",
    "contact.orders": "للطلبات والاستفسارات",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const isRTL = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-arabic" : "font-english"}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
