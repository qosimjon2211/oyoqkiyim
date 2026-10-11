import React from 'react'
import { ShopProvider } from './context/ShopContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Catalog } from './components/Catalog'
import { FavoritesPage } from './components/FavoritesPage'
import { AddressSection } from './components/AddressSection'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { ProductSheet } from './components/ProductSheet'
import { BottomNav } from './components/BottomNav'
import { Toast } from './components/Toast'

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F4F0] text-[#111111]" lang="uz">
        <Navbar />

        <main className="flex-1 w-full pb-16 md:pb-0">
          <Hero />
          <Catalog />
          <FavoritesPage />
          <AddressSection />
        </main>

        <div className="pb-16 md:pb-0">
          <Footer />
        </div>


        {/* Overlay'lar (tortma, modal) va xabarnoma */}
        <CartDrawer />
        <ProductSheet />
        <BottomNav />
        <Toast />
      </div>
    </ShopProvider>
  )
}
