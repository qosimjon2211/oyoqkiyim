import React from "react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";
import { IconHeart, IconBag } from "./Icons";

export const FavoritesPage = () => {
  const { activeTab, setActiveTab, favorites } = useShop();

  // Faqat 'favorites' tab'ida ko'rsatiladi
  if (activeTab !== "favorites") return null;

  const favList = products.filter((p) => favorites.includes(p.id));

  return (
    <section className="py-8 bg-white" aria-label="Sevimlilar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-baseline gap-2 mb-5">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#111111]">Sevimlilar</h2>
          {favList.length > 0 && (
            <span className="text-xs text-[#8B8B8B] font-semibold">{favList.length} ta mahsulot</span>
          )}
        </div>

        {favList.length === 0 ? (
          <div className="py-14 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F6F4F0] flex items-center justify-center mx-auto mb-3">
              <IconHeart className="w-7 h-7 text-[#8B8B8B]" />
            </div>
            <p className="text-sm font-bold text-[#111111] mb-1">Sevimlilar bo'sh</p>
            <p className="text-xs text-[#8B8B8B] mb-5 max-w-sm mx-auto">
              Yoqqan poyabzalning yurakchani bosing — u shu yerda saqlanib qoladi va keyinroq
              osongina topasiz.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab("catalog")}
              className="px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold min-h-[44px] hover:bg-black transition-colors inline-flex items-center justify-center gap-2"
            >
              <IconBag className="w-3.5 h-3.5" />
              <span>Katalogga o'tish</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {favList.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
