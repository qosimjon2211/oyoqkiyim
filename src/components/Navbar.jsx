import React, { useState, useRef, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { IconSearch, IconHeart, IconBag, IconClose, IconTelegram, IconMenu } from "./Icons";

const NAV_LINKS = [
  { id: "home", label: "Bosh sahifa" },
  { id: "catalog", label: "Katalog" },
  { id: "contact", label: "Manzil va aloqa" },
];

export const Navbar = () => {
  const {
    siteConfig,
    cartItemsCount,
    favorites,
    searchQuery,
    setSearchQuery,
    openCart,
    setActiveTab,
    activeTab,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Mobil menyudan tashqariga bosilganda yopish
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    // Qidiruv boshlanganda avtomatik katalogga o'tamiz
    if (activeTab !== "catalog" && value.trim().length > 0) {
      setActiveTab("catalog");
    }
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Yuqori e'lon paneli / Announcement bar */}
      <div className="bg-[#111111] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span className="opacity-80">🚚 Toshkent bo'ylab 2-4 soatda tezkor yetkazib beramiz!</span>
        <span className="hidden md:inline mx-2 opacity-40">•</span>
        <span className="hidden md:inline text-[#FF5A36] font-semibold">100% Asl mahsulot kafolati</span>
      </div>

      <div className="bg-white/90 backdrop-blur-md border-b border-[#E7E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* Logo va Do'kon nomi */}
            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-2.5 select-none group flex-shrink-0"
              aria-label="Bosh sahifaga qaytish"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center font-extrabold text-base tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-[#FF5A36]">B</span>N
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-[#111111] leading-tight">
                  {siteConfig.shopName}
                </span>
                <span className="text-[10px] text-[#8B8B8B] tracking-wider uppercase font-semibold">
                  Original Shoes
                </span>
              </div>
            </button>

            {/* Qidiruv qatori (Live filter) */}
            <div className="flex-1 max-w-md mx-1 sm:mx-4">
              <div className="relative flex items-center">
                <div className="absolute left-3.5 pointer-events-none text-[#8B8B8B]">
                  <IconSearch className="w-4 h-4" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Poyabzal yoki brend qidirish..."
                  aria-label="Mahsulot qidirish"
                  className="w-full bg-[#F6F4F0] hover:bg-[#EFECE6] focus:bg-white text-xs sm:text-sm text-[#111111] placeholder-[#8B8B8B] rounded-full pl-9 pr-8 py-2 sm:py-2.5 border border-transparent focus:border-[#111111] outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 text-[#8B8B8B] hover:text-[#111111] transition-colors p-0.5"
                    aria-label="Qidiruvni tozalash"
                  >
                    <IconClose className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop navigatsiya */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#111111]">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => setActiveTab(link.id)}
                  className={`hover:text-[#FF5A36] transition-colors ${
                    activeTab === link.id ? "text-[#FF5A36]" : ""
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* O'ng taraf: Sevimlilar va Savat */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Telegram tezkor kanal havolasi (desktop) */}
              <a
                href={`https://t.me/${siteConfig.telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/20 transition-colors"
              >
                <IconTelegram className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>

              {/* Sevimlilar tugmasi */}
              <button
                type="button"
                onClick={() => setActiveTab("favorites")}
                className={`relative p-2.5 sm:p-3 rounded-full hover:bg-[#F6F4F0] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  activeTab === "favorites" ? "text-[#FF5A36]" : "text-[#111111]"
                }`}
                aria-label={`Sevimlilar ro'yxati (${favorites.length})`}
              >
                <IconHeart
                  className={`w-5 h-5 ${activeTab === "favorites" ? "fill-[#FF5A36]" : ""}`}
                  filled={activeTab === "favorites"}
                />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#FF5A36] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center animate-pop">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Savat tugmasi — CartDrawer'ni ochadi (avval 'cart' tab'iga o'tib, bo'sh sahifa qolardi) */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 sm:p-3 rounded-full hover:bg-[#F6F4F0] text-[#111111] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center group"
                aria-label={`Savatni ochish (${cartItemsCount} mahsulot)`}
              >
                <IconBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#111111] text-white text-[10px] font-extrabold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center border-2 border-white">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobil menyu tugmasi */}
              <div className="relative lg:hidden" ref={mobileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className="p-2.5 rounded-full hover:bg-[#F6F4F0] text-[#111111] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Menyu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <IconClose className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
                </button>

                {isMobileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-[#E7E3DC] shadow-xl overflow-hidden animate-modal-in">
                    {NAV_LINKS.map((link) => (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(link.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-semibold hover:bg-[#F6F4F0] transition-colors ${
                          activeTab === link.id ? "text-[#FF5A36]" : "text-[#111111]"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

