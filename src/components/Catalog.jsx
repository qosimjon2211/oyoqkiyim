import React, { useMemo } from "react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

const SORT_OPTIONS = [
  { value: "featured", label: "Tavsiya etilgan" },
  { value: "cheap", label: "Arzonroq" },
  { value: "expensive", label: "Qimmatroq" },
  { value: "new", label: "Yangi" },
];

export const Catalog = () => {
  const {
    siteConfig,
    activeTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    onlyDiscount,
    setOnlyDiscount,
    sortBy,
    setSortBy,
  } = useShop();

  const categories = siteConfig.categories || [];

  // Filtrlar va saralash — useMemo bilan, har renderda qayta hisoblamaslik.
  // DIQQAT: Hook'lar shartdan oldin turishi shart, shuning uchun useMemo tepada.
  const list = useMemo(() => {
    let result = products.filter((p) => selectedCategory === "all" || p.category === selectedCategory);

    const query = searchQuery?.trim().toLowerCase();
    if (query) {
      result = result.filter((p) =>
        `${p.name} ${p.brand} ${p.categoryName}`.toLowerCase().includes(query)
      );
    }

    if (onlyDiscount) {
      result = result.filter((p) => Boolean(p.discount));
    }

    // O'zimizni buzmaslik uchun nusxa olamiz
    const sorted = [...result];
    switch (sortBy) {
      case "cheap":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "new":
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // "featured": avval tanlangan (isFeatured) modellar, keyin qolganlari
        sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
    return sorted;
  }, [selectedCategory, searchQuery, onlyDiscount, sortBy]);

  // Faqat 'catalog' tab'ida ko'rsatiladi (barcha hook'lardan KEYIN)
  if (activeTab !== "catalog") return null;

  const hasActiveFilters = selectedCategory !== "all" || Boolean(searchQuery) || onlyDiscount;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setOnlyDiscount(false);
  };

  return (
    <section id="katalog" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sarlavha va boshqaruv paneli */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#111111]">Katalog</h2>
            <span className="text-xs text-[#8B8B8B] font-semibold">
              {list.length} ta mahsulot
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label className="flex items-center gap-1.5">
              <span className="text-[#8B8B8B] font-semibold">Saralash</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-[#E7E3DC] bg-white px-2.5 py-2 font-semibold text-[#111111] min-h-[40px] cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none rounded-lg border border-[#E7E3DC] px-2.5 py-2 min-h-[40px] font-semibold">
              <input
                type="checkbox"
                checked={onlyDiscount}
                onChange={(e) => setOnlyDiscount(e.target.checked)}
                className="accent-[#FF5A36] w-4 h-4"
              />
              Chegirma
            </label>
          </div>
        </div>

        {/* Kategoriya chip-filtrlari */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={selectedCategory === cat.id}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors min-h-[40px] ${
                selectedCategory === cat.id
                  ? "bg-[#111111] text-white"
                  : "bg-[#F6F4F0] text-[#111111] border border-[#E7E3DC] hover:border-[#111111]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Mahsulotlar ro'yxati */}
        {list.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-14 text-center">
            <p className="text-sm font-bold text-[#111111] mb-1">Mahsulot topilmadi 🔍</p>
            <p className="text-xs text-[#8B8B8B] mb-4">
              Boshqa so'z yoki kategoriya bilan qidirib ko'ring.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold min-h-[44px] hover:bg-black transition-colors"
              >
                Filtrlarni tozalash
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
