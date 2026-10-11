import React from "react";
import { useShop } from "../context/ShopContext";
import { siteConfig } from "../data/site";
import { IconPhone, IconInstagram, IconTelegram, IconMapPin, IconClock, IconTruck, IconShield, IconRefresh, IconCamera } from "./Icons";

// Trust point ikonkalarini nom bo'yicha tanlash
const TRUST_ICONS = {
  shield: IconShield,
  truck: IconTruck,
  refresh: IconRefresh,
  camera: IconCamera,
};

export const AddressSection = () => {
  const { activeTab } = useShop();

  // Faqat 'contact' tab'ida ko'rsatiladi
  if (activeTab !== "contact") return null;

  return (
    <section className="py-8 bg-white" aria-label="Manzil va aloqa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-[#111111] mb-1">Manzil va aloqa</h2>
        <p className="text-sm text-[#8B8B8B] mb-6">{siteConfig.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Manzil kartochkasi */}
          <div className="p-5 bg-[#F6F4F0] rounded-2xl border border-[#E7E3DC]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-[#E7E3DC]">
                <IconMapPin className="w-4 h-4 text-[#FF5A36]" />
              </div>
              <h3 className="text-sm font-extrabold text-[#111111]">Bizning do'kon</h3>
            </div>

            <p className="text-sm text-[#555555] leading-relaxed mb-2">{siteConfig.address}</p>
            {siteConfig.landmark && (
              <p className="text-xs text-[#8B8B8B] mb-3">{siteConfig.landmark}</p>
            )}

            <div className="flex items-start gap-2 pt-3 border-t border-[#E7E3DC]">
              <IconClock className="w-4 h-4 text-[#8B8B8B] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#111111]">Ish vaqti</p>
                <p className="text-xs text-[#555555]">{siteConfig.workingHours}</p>
              </div>
            </div>
          </div>

          {/* Aloqa kartochkasi */}
          <div className="p-5 bg-[#F6F4F0] rounded-2xl border border-[#E7E3DC]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center border border-[#E7E3DC]">
                <IconPhone className="w-4 h-4 text-[#FF5A36]" />
              </div>
              <h3 className="text-sm font-extrabold text-[#111111]">Bog'lanish</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold min-h-[44px] hover:bg-black transition-colors"
              >
                <IconPhone className="w-3.5 h-3.5" />
                <span>Qo'ng'iroq qilish</span>
              </a>
              <a
                href={`https://t.me/${siteConfig.telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#229ED9] text-white text-xs font-bold min-h-[44px] hover:bg-[#1b8ab8] transition-colors"
              >
                <IconTelegram className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#111111] border border-[#E7E3DC] text-xs font-bold min-h-[44px] hover:border-[#111111] transition-colors"
              >
                <IconInstagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>

            <div className="flex items-start gap-2 pt-3 border-t border-[#E7E3DC]">
              <IconTruck className="w-4 h-4 text-[#8B8B8B] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#111111]">Yetkazib berish</p>
                <p className="text-xs text-[#555555]">{siteConfig.deliveryInfo}</p>
              </div>
            </div>

            <p className="text-xs text-[#555555] mt-2">Telefon: <span className="font-bold text-[#111111]">{siteConfig.phone}</span></p>
          </div>
        </div>

        {/* Nega bizga ishonishadi */}
        <div>
          <h3 className="text-sm font-extrabold text-[#111111] mb-3">Nega bizni tanlashadi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {siteConfig.trustPoints.map((point) => {
              const IconComponent = TRUST_ICONS[point.icon] ?? IconShield;
              return (
                <div
                  key={point.id}
                  className="p-4 bg-white rounded-2xl border border-[#E7E3DC] hover:border-[#111111]/30 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F6F4F0] flex items-center justify-center mb-2.5">
                    <IconComponent className="w-5 h-5 text-[#FF5A36]" />
                  </div>
                  <p className="text-sm font-bold text-[#111111] mb-1">{point.title}</p>
                  <p className="text-xs text-[#8B8B8B] leading-relaxed">{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
