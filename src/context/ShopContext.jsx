import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { siteConfig } from "../data/site";
import { formatPrice } from "../data/products";

const ShopContext = createContext(null);

const STORAGE_KEYS = {
  CART: "brend_nomi_cart_v1",
  FAVORITES: "brend_nomi_favorites_v1",
};

// localStorage dan xavfsiz o'qish (buzilgan JSON yoki massiv bo'lmagan qiymatga chidamli)
const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (e) {
    console.warn(`${key} o'qishda xatolik:`, e);
    return fallback;
  }
};

export const ShopProvider = ({ children }) => {
  // Savat holati (Cart state)
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.CART, []));

  // Sevimlilar holati (Favorites state)
  const [favorites, setFavorites] = useState(() => readStorage(STORAGE_KEYS.FAVORITES, []));

  // Navigatsiya va filtrlar holati
  const [activeTab, setActiveTab] = useState("home"); // 'home' | 'catalog' | 'favorites' | 'contact'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedSize, setSelectedSize] = useState(null);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Modallar va tortmalar
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Toast taymeri: unmount bo'lganda xotira oqmasligi uchun tozalash
  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Cart o'zgarganda localStorage ga saqlash
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn("Cart saqlashda xatolik:", e);
    }
  }, [cart]);

  // Favorites o'zgarganda localStorage ga saqlash
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.warn("Favorites saqlashda xatolik:", e);
    }
  }, [favorites]);

  // Xabarnoma (Toast) ko'rsatish
  const showToast = useCallback((message) => {
    setToastMessage(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Savatga mahsulot qo'shish
  const addToCart = useCallback((product, size, color, quantity = 1) => {
    const chosenSize = size ?? product.sizes?.[0] ?? null;
    const chosenColor = color ?? product.colors?.[0]?.name ?? "Standart";
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prevCart,
        { cartItemId, productId: product.id, product, size: chosenSize, color: chosenColor, quantity },
      ];
    });

    showToast(`"${product.name}" savatga qo'shildi! ✅`);
  }, [showToast]);

  // Savatdagi sonini o'zgartirish (0 yoki kam bo'lsa — o'chiramiz)
  const updateQuantity = useCallback((cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.cartItemId !== cartItemId) return item;
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        })
        .filter(Boolean)
    );
  }, []);

  // Mahsulotni savatdan o'chirish
  const removeFromCart = useCallback((cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    showToast("Mahsulot savatdan o'chirildi");
  }, [showToast]);

  // Savatni tozalash
  const clearCart = useCallback(() => setCart([]), []);

  // Sevimlilarga qo'shish / chiqarish
  const toggleFavorite = useCallback((productId) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        showToast("Sevimlilardan olib tashlandi");
        return prev.filter((id) => id !== productId);
      }
      showToast("Sevimlilarga saqlandi ❤️");
      return [...prev, productId];
    });
  }, [showToast]);

  const isFavorite = useCallback((productId) => favorites.includes(productId), [favorites]);

  // Hisob-kitlablar
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );
  const cartItemsCount = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart]
  );

  // Savat tortmasini boshqarish uchun yagona yo'l
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // Telegram orqali bitta mahsulotga tezkor buyurtma berish
  const orderSingleItemTelegram = useCallback((product, size, color) => {
    const chosenSize = size ?? product.sizes?.[0] ?? "—";
    const chosenColor = color ?? product.colors?.[0]?.name ?? "Standart";

    const text = `Assalomu alaykum, ${siteConfig.shopName}!
Men ushbu poyabzalni buyurtma qilmoqchiman:

👟 Mahsulot: ${product.name}
🏷 Brend: ${product.brand}
📏 Razmer: ${chosenSize}
🎨 Rang: ${chosenColor}
💰 Narxi: ${formatPrice(product.price)}

📍 Yetkazib berish manzili:
📞 Telefon raqamim: `;

    window.open(
      `https://t.me/${siteConfig.telegramUsername}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  // Butun savatni Telegram orqali yuborish
  const sendCartToTelegram = useCallback(() => {
    if (cart.length === 0) {
      showToast("Savat bo'sh — avval mahsulot qo'shing");
      return;
    }

    let itemsList = "";
    cart.forEach((item, index) => {
      itemsList += `${index + 1}. ${item.product.name}\n` +
        `   • Razmer: ${item.size ?? "—"} | Rang: ${item.color}\n` +
        `   • Soni: ${item.quantity} dona x ${formatPrice(item.product.price)} = ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });

    const text = `Assalomu alaykum, ${siteConfig.shopName}!
Saytingiz orqali savatdagi quyidagi buyurtmani rasmiylashtirmoqchiman:

${itemsList.trim()}

━━━━━━━━━━━━━━━━━━━━━━
💵 JAMI SUMMA: ${formatPrice(cartTotal)}
━━━━━━━━━━━━━━━━━━━━━━

📍 Yetkazib berish manzili:
📞 Telefon raqamim:
💬 Izoh / Qo'shimcha istak: `;

    window.open(
      `https://t.me/${siteConfig.telegramUsername}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, [cart, cartTotal, showToast]);

  // Barcha qiymatlarni bitta obyektga yig'ish (keraksiz re-render'larning oldi olinadi)
  const value = useMemo(() => ({
    siteConfig,
    cart,
    favorites,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    selectedSize,
    setSelectedSize,
    onlyDiscount,
    setOnlyDiscount,
    sortBy,
    setSortBy,
    selectedProduct,
    setSelectedProduct,
    isCartOpen,
    setIsCartOpen,
    openCart,
    closeCart,
    toastMessage,
    showToast,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleFavorite,
    isFavorite,
    cartTotal,
    cartItemsCount,
    orderSingleItemTelegram,
    sendCartToTelegram,
  }), [
    cart, favorites, activeTab, searchQuery, selectedCategory, selectedBrand,
    selectedSize, onlyDiscount, sortBy, selectedProduct, isCartOpen, toastMessage,
    openCart, closeCart, showToast, addToCart, updateQuantity, removeFromCart,
    clearCart, toggleFavorite, isFavorite, cartTotal, cartItemsCount,
    orderSingleItemTelegram, sendCartToTelegram,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};

