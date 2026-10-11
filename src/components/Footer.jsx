import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { siteConfig } from "../data/site";
import { IconTelegram, IconInstagram, IconPhone, IconMapPin } from "./Icons";

export const Footer = () => {
  const { setActiveTab } = useShop();
  // Yil komponent yuklangan vaqtda bir marta aniqlanadi (impure chaqiruv renderdan tashqarida)
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="mt-6 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brend bloki */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#111111] flex items-center justify-center font-extrabold tracking-tighter">
                <span className="text-[#FF5A36]">B</span>N
              </div>
              <span className="font-extrabold text-lg tracking-tight">{siteConfig.shopName}</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-4">{siteConfig.tagline}.</p>
            <div className="flex gap-2">
              <a
                href={`https://t.me/${siteConfig.telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram kanalimiz"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <IconTelegram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram sahifamiz"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <IconInstagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                aria-label="Telefon qilish"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <IconPhone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tezkor havolalar */}
          <div>
            <p className="text-sm font-bold mb-3">Tezkor havolalar</p>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <button type="button" onClick={() => setActiveTab("home")} className="hover:text-white transition-colors">
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab("catalog")} className="hover:text-white transition-colors">
                  Katalog
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab("favorites")} className="hover:text-white transition-colors">
                  Sevimlilar
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setActiveTab("contact")} className="hover:text-white transition-colors">
                  Manzil va aloqa
                </button>
              </li>
            </ul>
          </div>

          {/* Aloqa */}
          <div>
            <p className="text-sm font-bold mb-3">Aloqa</p>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li className="flex items-start gap-2">
                <IconMapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#FF5A36]" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <IconPhone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#FF5A36]" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <IconTelegram className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#FF5A36]" />
                <a
                  href={`https://t.me/${siteConfig.telegramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @{siteConfig.telegramUsername}
                </a>
              </li>
            </ul>
            <p className="text-[11px] text-white/40 mt-3">{siteConfig.workingHours}</p>
          </div>
        </div>

        {/* Pastki chiziq */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
          <p>© {year} {siteConfig.shopName}. Barcha huquqlar himoyalangan.</p>
          <p>{siteConfig.city}, O'zbekiston</p>
        </div>
      </div>
    </footer>
  );
};
