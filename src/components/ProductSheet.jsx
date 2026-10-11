import React, { useState, useRef } from "react";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../data/products";
import { IconClose, IconHeart, IconBag, IconTelegram, IconShield, IconTruck, IconRefresh, IconStar } from "./Icons";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "../hooks/useOverlay";

export const ProductSheet = () => {
  const { selectedProduct, setSelectedProduct, addToCart, orderSingleItemTelegram, isFavorite, toggleFavorite, openCart } =
    useShop();

  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const sheetRef = useRef(null);

  const isOpen = Boolean(selectedProduct);
  const p = selectedProduct;

  const handleClose = () => setSelectedProduct(null);

  // Mahsulot o'zgarganda holatni tozalash uchun render-time "key" usuli:
  // Tanlangan mahsulot ID'si state sifatida saqlanadi va o'zgarsa, React komponentni
  // darhol qayta render qiladi. Bu effect'siz, toza reset beradi.
  const [activeProductId, setActiveProductId] = useState(null);

  if (p && p.id !== activeProductId) {
    setActiveProductId(p.id);
    setImageIndex(0);
    setSelectedSize(null);
    setSelectedColor(0);
  }

  // Modal ochiq bo'lganda orqa fon skrollini bloklash + Escape bilan yopish + fokus ushlash
  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, handleClose);
  useFocusTrap(isOpen, sheetRef);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    const color = colors[selectedColor]?.name ?? "Standart";
    addToCart(p, selectedSize, color, 1);
    handleClose();
    openCart();
  };

  const handleDirectOrder = () => {
    const color = colors[selectedColor]?.name ?? "Standart";
    orderSingleItemTelegram(p, selectedSize, color);
  };

  // Komponent hech narsa ko'rsatmasligi kerak bo'lsa — barcha hook'lardan keyin chiqamiz
  if (!p) return null;

  const images = p.images?.length ? p.images : [];
  const colors = p.colors?.length ? p.colors : [{ name: "Standart", hex: "#111111" }];
  // allSizes bo'lmasa, mavjud razmerlardan foydalanamiz
  const allSizes = p.allSizes?.length ? p.allSizes : p.sizes ?? [];
  const availableSizes = p.sizes ?? [];
  const favorited = isFavorite(p.id);
  const discountPercent = p.oldPrice
    ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Orqa fon (backdrop) */}
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Asosiy panel */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-sheet-title"
        className="relative w-full md:max-w-4xl max-h-[92dvh] md:max-h-[88vh] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-sheet-up md:animate-modal-in"
      >
        {/* Yopish tugmasi */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Yopish"
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-[#E7E3DC] flex items-center justify-center text-[#111111] hover:bg-white transition-colors shadow-xs"
        >
          <IconClose className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          <div className="flex flex-col md:flex-row md:gap-6 p-4 md:p-6">
            {/* CHAP: Rasmlar galereyasi */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <div className="relative bg-[#F6F4F0] img-fallback rounded-xl flex items-center justify-center overflow-hidden aspect-square mb-3">
                <img
                  src={images[imageIndex] ?? images[0]}
                  alt={p.name}
                  className="w-full h-full object-contain p-3"
                />
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-[#FF5A36] text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              {/* Mini rasmlar */}
              {images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageIndex(idx)}
                      aria-label={`Rasm ${idx + 1}`}
                      aria-current={idx === imageIndex}
                      className={`w-12 h-12 rounded-lg border-2 bg-[#F6F4F0] overflow-hidden transition-colors ${
                        idx === imageIndex ? "border-[#111111]" : "border-[#E7E3DC] hover:border-[#8B8B8B]"
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* O'NG: Tafsilotlar */}
            <div className="w-full md:w-1/2 flex flex-col mt-4 md:mt-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B8B8B]">
                  {p.brand}
                </span>
                <button
                  type="button"
                  onClick={() => toggleFavorite(p.id)}
                  aria-label={favorited ? "Sevimlilardan chiqarish" : "Sevimlilarga qo'shish"}
                  aria-pressed={favorited}
                  className="w-10 h-10 rounded-full border border-[#E7E3DC] flex items-center justify-center hover:bg-[#F6F4F0] transition-colors"
                >
                  <IconHeart
                    className={`w-4 h-4 ${favorited ? "text-[#FF5A36] fill-[#FF5A36]" : "text-[#111111]"}`}
                    filled={favorited}
                  />
                </button>
              </div>

              <h2 id="product-sheet-title" className="text-lg md:text-2xl font-extrabold text-[#111111] mb-2 leading-snug">
                {p.name}
              </h2>

              {/* Reyting */}
              {p.rating && (
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex items-center gap-0.5 text-[#FFA000]">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} className="w-3.5 h-3.5 fill-current" filled={i < Math.round(p.rating)} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#111111]">{p.rating}</span>
                  {p.reviewsCount && (
                    <span className="text-xs text-[#8B8B8B]">({p.reviewsCount} sharh)</span>
                  )}
                </div>
              )}

              {/* Narx */}
              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <span className="text-2xl font-extrabold text-[#111111] whitespace-nowrap">
                  {formatPrice(p.price)}
                </span>
                {p.oldPrice && (
                  <span className="text-sm text-[#8B8B8B] line-through whitespace-nowrap">
                    {formatPrice(p.oldPrice)}
                  </span>
                )}
              </div>

              {p.description && (
                <p className="text-sm text-[#555555] leading-relaxed mb-4">{p.description}</p>
              )}

              {/* Razmerlar — mavjud / mavjud emas aniq ko'rsatiladi */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#111111]">Razmer</span>
                  {!selectedSize && (
                    <span className="text-[11px] text-[#FF5A36] font-semibold">Razmerni tanlang</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => {
                    const inStock = availableSizes.includes(size);
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={!inStock}
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={isSelected}
                        title={inStock ? `Razmer ${size}` : "Bu razmer mavjud emas"}
                        className={`min-w-[46px] min-h-[44px] px-3 rounded-xl text-sm font-bold transition-all ${
                          isSelected
                            ? "bg-[#111111] text-white border border-[#111111]"
                            : inStock
                              ? "bg-white text-[#111111] border border-[#E7E3DC] hover:border-[#111111]"
                              : "bg-[#F6F4F0] text-[#C4C0B8] border border-[#EFECE6] line-through cursor-not-allowed"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ranglar */}
              <div className="mb-4">
                <span className="text-xs font-bold text-[#111111] block mb-2">
                  Rang: <span className="text-[#8B8B8B] font-semibold">{colors[selectedColor]?.name}</span>
                </span>
                <div className="flex gap-2.5 items-center">
                  {colors.map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(idx)}
                      title={c.name}
                      aria-label={c.name}
                      aria-pressed={selectedColor === idx}
                      style={{ backgroundColor: c.hex }}
                      className={`w-9 h-9 rounded-full transition-all ${
                        c.border ? "border border-[#CCCCCC]" : ""
                      } ${
                        selectedColor === idx
                          ? "ring-2 ring-offset-2 ring-[#111111] scale-105"
                          : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Xususiyatlar */}
              {p.features?.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#111111] block mb-2">Xususiyatlari</span>
                  <ul className="space-y-1.5">
                    {p.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#555555]">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF5A36] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ishonch afzalliklari */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 py-3 border-y border-[#F0ECE4]">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#555]">
                  <IconShield className="w-3.5 h-3.5 text-[#16A34A]" /> 100% Original
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#555]">
                  <IconTruck className="w-3.5 h-3.5 text-[#2563EB]" /> 2-4 soatda yetkazish
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#555]">
                  <IconRefresh className="w-3.5 h-3.5 text-[#D97706]" /> 24 soatda almashtirish
                </span>
              </div>

              {/* Harakat tugmalari */}
              <div className="mt-auto flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="flex-1 py-3 px-3 rounded-xl bg-[#111111] text-white font-bold text-sm min-h-[48px] flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all disabled:bg-[#C4C0B8] disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <IconBag className="w-4 h-4" />
                  <span>Savatga qo'shish</span>
                </button>
                <button
                  type="button"
                  onClick={handleDirectOrder}
                  disabled={!selectedSize}
                  className="flex-1 py-3 px-3 rounded-xl bg-[#229ED9] text-white font-bold text-sm min-h-[48px] flex items-center justify-center gap-2 hover:bg-[#1b8ab8] active:scale-[0.98] transition-all disabled:bg-[#C4C0B8] disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <IconTelegram className="w-4 h-4" />
                  <span>Telegramda buyurtma</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



