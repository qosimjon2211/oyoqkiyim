import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useShop } from "../context/ShopContext";
import { products, formatPrice } from "../data/products";
import { IconTelegram, IconArrowRight, IconStar } from "./Icons";

const TILT_ANGLES = ["-rotate-1", "rotate-2", "-rotate-2", "rotate-1"];

export const Hero = () => {
  const { siteConfig, setActiveTab, setSelectedCategory, setSelectedProduct } = useShop();

  const heroRef = useRef(null);

  // GSAP Hero intro animatsiyasi (prefers-reduced-motion inobatga olingan)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: -15, duration: 0.6 })
        .from(".hero-title-line", { opacity: 0, y: 25, duration: 0.8, stagger: 0.15 }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-cta-btn", { opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".hero-card-item", {
          opacity: 0,
          y: 35,
          rotate: -6,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.2)",
        }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Hero uchun tanlangan 4 ta asosiy model
  const featuredShoes = products.filter((p) => p.isFeatured).slice(0, 4);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActiveTab("catalog");
    // Katalog render bo'lgach, uning boshiga mayin siljiymiz
    requestAnimationFrame(() => {
      document.getElementById("katalog-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section ref={heroRef} className="pt-6 sm:pt-10 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Asosiy matn bloki */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E7E3DC] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Yangi To'plam 2026
            </span>
            <span className="text-xs text-[#8B8B8B]">| {siteConfig.city}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111111] leading-[1.1] mb-4 sm:mb-5">
            <span className="hero-title-line block">Har qadamda ishonch</span>
            <span className="hero-title-line block text-[#FF5A36]">va mutlaq qulaylik.</span>
          </h1>

          <p className="hero-desc text-sm sm:text-lg text-[#555555] font-medium max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            {siteConfig.tagline}. Shahar bo'ylab tezkor yetkazib beramiz, razmer mos kelmasa 24 soatda almashtirib beramiz.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => handleCategoryClick("all")}
              className="hero-cta-btn w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#111111] text-white font-bold text-sm hover:bg-black active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Katalogni ko'rish</span>
              <IconArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://t.me/${siteConfig.telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-btn w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#F0EDE7] text-[#111111] font-bold text-sm border border-[#E7E3DC] active:scale-95 transition-all shadow-xs flex items-center justify-center gap-2 min-h-[48px]"
            >
              <IconTelegram className="w-4 h-4 text-[#229ED9]" />
              <span>Telegramda yozish</span>
            </a>
          </div>
        </div>

        {/* Top modellar — gorizontal scroll */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B8B8B]">
              Top modellar
            </span>
            <span className="text-xs text-[#FF5A36] font-semibold">Barchasi original</span>
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth">
            {featuredShoes.map((shoe, idx) => (
              <div
                key={shoe.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProduct(shoe)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProduct(shoe);
                  }
                }}
                className={`hero-card-item flex-shrink-0 w-[240px] sm:w-[280px] bg-white rounded-2xl p-4 border border-[#E7E3DC] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer snap-start group ${TILT_ANGLES[idx % TILT_ANGLES.length]} hover:rotate-0 hover:-translate-y-1`}
              >
                <div className="relative aspect-square w-full rounded-xl bg-[#F6F4F0] img-fallback flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={shoe.images[0]}
                    alt={shoe.name}
                    loading="lazy"
                    decoding="async"
                    width={280}
                    height={280}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  {shoe.discount && (
                    <span className="absolute top-2 left-2 bg-[#FF5A36] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-lg shadow-xs">
                      {shoe.discount}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-[#111111]">
                    Mavjud
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8B8B8B] mb-1">
                  <span className="font-bold uppercase tracking-wider">{shoe.brand}</span>
                  <div className="flex items-center gap-1 text-[#FFA000]">
                    <IconStar className="w-3 h-3 fill-current" />
                    <span className="font-bold text-[#111111]">{shoe.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-[#111111] line-clamp-1 mb-2 group-hover:text-[#FF5A36] transition-colors">
                  {shoe.name}
                </h3>

                <div className="flex items-baseline justify-between pt-1 border-t border-[#F0ECE4] gap-2">
                  <span className="font-extrabold text-sm text-[#111111] whitespace-nowrap">
                    {formatPrice(shoe.price)}
                  </span>
                  {shoe.oldPrice && (
                    <span className="text-xs text-[#8B8B8B] line-through whitespace-nowrap">
                      {formatPrice(shoe.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kategoriya chip-filtrlari */}
        <div id="katalog-section" className="pt-2 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {siteConfig.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className="flex-shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 min-h-[44px] flex items-center justify-center bg-white text-[#111111] border border-[#E7E3DC] hover:border-[#111111] hover:bg-[#F6F4F0]"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
