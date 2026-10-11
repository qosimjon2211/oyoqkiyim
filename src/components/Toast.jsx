import React from "react";
import { useShop } from "../context/ShopContext";

export const Toast = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm animate-toast-in"
      role="status"
      aria-live="polite"
    >
      <div className="bg-[#111111] text-white text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl text-center">
        {toastMessage}
      </div>
    </div>
  );
};
