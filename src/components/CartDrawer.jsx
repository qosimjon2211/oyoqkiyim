import React, { useRef } from "react";
import { useShop } from "../context/ShopContext";
import { formatPrice } from "../data/products";
import { IconClose, IconPlus, IconMinus, IconBag, IconTrash, IconTruck, IconTelegram } from "./Icons";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "../hooks/useOverlay";

export const CartDrawer = () => {
  const {
    cart, isCartOpen, closeCart, cartTotal,
    updateQuantity, removeFromCart, clearCart, sendCartToTelegram,
  } = useShop();

  const drawerRef = useRef(null);

  // Ochiq bo'lganda: fon skrolli bloklanadi, Escape yopadi, fokus ichida qoladi
  useBodyScrollLock(isCartOpen);
  useEscapeKey(isCartOpen, closeCart);
  useFocusTrap(isCartOpen, drawerRef);

  return (
    <>
      {/* Orqa fon (backdrop) — faqat ochiq holatda */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={closeCart} aria-hidden="true" />
      )}

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Savat"
        aria-hidden={!isCartOpen}
        className={`fixed top-0 right-0 h-full w-[min(92vw,420px)] bg-white border-l border-[#E7E3DC] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sarlavha */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#E7E3DC]">
          <div className="flex items-center gap-2">
            <IconBag className="w-5 h-5 text-[#111111]" />
            <span className="font-extrabold text-lg text-[#111111]">Savat</span>
            {cart.length > 0 && (
              <span className="text-xs font-bold text-[#8B8B8B]">({cart.length} tur)</span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Savatni yopish"
            className="w-10 h-10 rounded-full hover:bg-[#F6F4F0] flex items-center justify-center text-[#111111] transition-colors"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Mahsulotlar ro'yxati */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#F6F4F0] flex items-center justify-center mb-3">
                <IconBag className="w-7 h-7 text-[#8B8B8B]" />
              </div>
              <p className="text-sm font-bold text-[#111111] mb-1">Savat bo'sh</p>
              <p className="text-xs text-[#8B8B8B] mb-4 max-w-[220px]">
                Katalogdan yoqqan poyabzalni tanlab, savatga qo'shing.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold min-h-[44px] hover:bg-black transition-colors"
              >
                Katalogni ko'rish
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item.cartItemId} className="flex gap-3 pb-3 border-b border-[#F0ECE4] last:border-b-0">
                  <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-[#F6F4F0] img-fallback overflow-hidden flex items-center justify-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      loading="lazy"
                      decoding="async"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111111] line-clamp-2 leading-snug">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-[#8B8B8B] mt-0.5">
                      Razmer: {item.size ?? "—"} • {item.color}
                    </p>

                    <div className="flex items-center justify-between mt-2 gap-2">
                      {/* Soni boshqaruvi */}
                      <div className="flex items-center gap-1 bg-[#F6F4F0] rounded-full p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          aria-label="Soni kamaytirish"
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#111111] hover:bg-[#EFECE6] transition-colors shadow-xs"
                        >
                          <IconMinus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          aria-label="Soni oshirish"
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#111111] hover:bg-[#EFECE6] transition-colors shadow-xs"
                        >
                          <IconPlus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Narx va o'chirish */}
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-extrabold text-[#111111] whitespace-nowrap">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          aria-label={`${item.product.name} ni savatdan o'chirish`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#8B8B8B] hover:text-[#FF5A36] hover:bg-[#F6F4F0] transition-colors"
                        >
                          <IconTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pastki qism: Jami va buyurtma */}
        {cart.length > 0 && (
          <div className="border-t border-[#E7E3DC] px-4 py-4 space-y-3 pb-safe">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#111111]">Jami</span>
              <span className="font-extrabold text-lg text-[#111111] whitespace-nowrap">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <p className="flex items-center gap-1.5 text-[11px] text-[#8B8B8B]">
              <IconTruck className="w-3.5 h-3.5 flex-shrink-0" /> Yetkazib berish narxi buyurtma tasdiqlanganda aniqlanadi
            </p>

            <button
              type="button"
              onClick={sendCartToTelegram}
              className="w-full py-3 rounded-xl bg-[#229ED9] text-white font-bold text-sm min-h-[48px] hover:bg-[#1b8ab8] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <IconTelegram className="w-4 h-4" />
              <span>Telegramda buyurtma berish</span>
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="w-full text-xs font-semibold text-[#8B8B8B] hover:text-[#FF5A36] transition-colors py-1"
            >
              Savatni tozalash
            </button>
          </div>
        )}
      </div>
    </>
  );
};
