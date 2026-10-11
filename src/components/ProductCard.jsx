import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../data/products";
import { IconHeart, IconBag } from "./Icons";

export const ProductCard = ({ product }) => {
  const { isFavorite, toggleFavorite, addToCart, setSelectedProduct } = useShop();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const favorited = isFavorite(product.id);

  const handleCardClick = (e) => {
    // Savat yoki sevimlilar tugmasi bosilsa, modalni ochmaymiz
    if (e.target.closest(".no-card-open")) return;
    setSelectedProduct(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const firstSize = product.sizes?.[0] ?? null;
    const firstColor = product.colors?.[0]?.name ?? "Standart";
    addToCart(product, firstSize, firstColor, 1);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelectedProduct(product);
        }
      }}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E7E3DC] hover:border-[#111111]/30 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden p-2.5 sm:p-3 select-none"
    >
      {/* Rasm maydoni */}
      <div className="relative aspect-square w-full rounded-xl bg-[#F6F4F0] img-fallback flex items-center justify-center overflow-hidden mb-2.5">
        {/* Skeleton loading holati */}
        {!imageLoaded && !imageFailed && (
          <div className="absolute inset-0 bg-[#E7E3DC] animate-shimmer rounded-xl" />
        )}

        {/* Rasm yuklanmasa — tinch fallback */}
        {imageFailed ? (
          <span className="text-[#8B8B8B] text-xs font-semibold">Rasm mavjud emas</span>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={300}
            height={300}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className={`w-full h-full object-contain p-2 transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Chegirma belgisi */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-[#FF5A36] text-white text-[10px] sm:text-[11px] font-extrabold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-lg shadow-xs z-10">
            {product.discount}
          </span>
        )}

        {/* Sevimlilar tugmasi */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={favorited ? "Sevimlilardan chiqarish" : "Sevimlilarga qo'shish"}
          aria-pressed={favorited}
          className="no-card-open absolute top-1 right-1 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center z-10 transition-transform active:scale-90"
        >
          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs border border-[#E7E3DC]/60 hover:bg-white transition-colors">
            <IconHeart
              className={`w-4 h-4 transition-colors ${
                favorited ? "text-[#FF5A36] fill-[#FF5A36]" : "text-[#111111]"
              }`}
              filled={favorited}
            />
          </div>
        </button>

        {/* Rang nuqtalari */}
        {product.colors?.length > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 backdrop-blur-xs px-1.5 py-1 rounded-full shadow-2xs">
            {product.colors.map((c, i) => (
              <span
                key={i}
                title={c.name}
                style={{ backgroundColor: c.hex }}
                className={`w-2.5 h-2.5 rounded-full ${c.border ? "border border-[#CCCCCC]" : ""}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Ma'lumot qismi */}
      <div className="flex flex-col flex-1">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#8B8B8B] mb-0.5">
          {product.brand}
        </span>

        <h3 className="text-xs sm:text-sm font-bold text-[#111111] line-clamp-2 leading-snug min-h-[2.4em] mb-2 group-hover:text-[#FF5A36] transition-colors">
          {product.name}
        </h3>

        {/* Narx bloki */}
        <div className="mt-auto pt-1 mb-2.5">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-xs sm:text-sm font-extrabold text-[#111111] whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[11px] text-[#8B8B8B] line-through font-medium whitespace-nowrap">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Savatga qo'shish tugmasi */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="no-card-open w-full py-2.5 px-3 rounded-xl bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-bold tracking-wide active:scale-[0.98] transition-all min-h-[44px] flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <IconBag className="w-3.5 h-3.5" />
          <span>Savatga</span>
        </button>
      </div>
    </div>
  );
};
