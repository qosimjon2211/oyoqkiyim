import React from "react";
import { useShop } from "../context/ShopContext";
import { IconHome, IconGrid, IconBag, IconHeart, IconMapPin } from "./Icons";

export const BottomNav = () => {
  const { activeTab, setActiveTab, openCart, isCartOpen, cartItemsCount, favorites } = useShop();

  const items = [
    { id: "home", label: "Bosh sahifa", icon: IconHome },
    { id: "catalog", label: "Katalog", icon: IconGrid },
    { id: "cart", label: "Savat", icon: IconBag, badge: cartItemsCount },
    { id: "favorites", label: "Sevimlilar", icon: IconHeart, badge: favorites.length },
    { id: "contact", label: "Aloqa", icon: IconMapPin },
  ];

  const handleClick = (item) => {
    // 'cart' — bu tab emas, balki o'ngdan chiqadigan tortma (drawer)
    if (item.id === "cart") {
      openCart();
      return;
    }
    setActiveTab(item.id);
  };

  // Savat ochiq bo'lganda pastki navigatsiya ustidan chiqib qolmasligi uchun yashiramiz
  const isActive = (itemId) => {
    if (itemId === "cart") return isCartOpen;
    return activeTab === itemId;
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E7E3DC] z-30 transition-transform duration-300 ${
        isCartOpen ? "translate-y-full" : "translate-y-0"
      }`}
      aria-label="Asosiy navigatsiya"
    >
      <div className="flex justify-around items-stretch text-[10px] text-[#111111] pb-safe">
        {items.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
              aria-current={active ? "page" : undefined}
              className={`flex-1 min-h-[56px] py-1.5 px-0.5 flex flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-[#FF5A36]" : "text-[#8B8B8B]"
              }`}
            >
              <span className="relative flex items-center justify-center">
                <IconComponent
                  className={`w-5 h-5 ${item.id === "favorites" && active ? "fill-[#FF5A36]" : ""}`}
                />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#FF5A36] text-white text-[9px] font-extrabold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center border border-white">
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="font-semibold leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
