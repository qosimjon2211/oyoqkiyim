/**
 * ====================================================================
 * DO'KON SOZLAMALARI / SHOP CONFIGURATION (SITE DATA)
 * ====================================================================
 * Ushbu fayldagi barcha ma'lumotlar butun sayt bo'ylab avtomatik qo'llaniladi.
 * Yangi mijoz uchun ushbu faylni tahrirlashning o'zi kifoya (1-2 soatda re-skin).
 */

export const siteConfig = {
  // Do'kon asosiy ma'lumotlari
  shopName: "Brend Nomi",
  tagline: "Premial sifat va zamonaviy uslub poyabzallari",
  description: "Toshkent shahri va butun O'zbekiston bo'ylab eng sara krossovkalar, klassik tuflilar va kundalik poyabzallar do'koni.",
  city: "Toshkent",
  
  // Aloqa vositalari va ijtimoiy tarmoqlar
  telegramUsername: "qcdxndev", // @ belgisisiz yozing
  telegramChannel: "https://t.me/qcdxndev",
  phone: "+998 00 000 00 00",
  phoneRaw: "+998000000000", // Qo'ng'iroq uchun (bosh joylarsiz)
  instagram: "brendnomi.uz",
  instagramUrl: "https://instagram.com",
  
  // Manzil va ish tartibi
  address: "Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko'chasi, 12-uy",
  landmark: "Mo'ljal: 'Mirzo Ulug'bek' metro bekati ro'parasida",
  workingHours: "Har kuni: 10:00 - 21:00 (dam olish kunisiz)",
  deliveryInfo: "Toshkent bo'ylab 2-4 soatda, O'zbekiston viloyatlariga 24 soat ichida yetkazib beriladi.",

  // Valyuta belgisi
  currency: "so'm",

  // "Nega biz" ishonch afzalliklari (Trust points)
  trustPoints: [
    {
      id: 1,
      title: "100% Sifat kafolati",
      desc: "Faqat sinovdan o'tgan, yuqori sifatli va uzoq xizmat qiladigan premium materiallar.",
      icon: "shield",
    },
    {
      id: 2,
      title: "Tezkor yetkazib berish",
      desc: "Toshkent bo'ylab buyurtma kuni, viloyatlarga BTS yoki pochta orqali 1 kunda yetkazamiz.",
      icon: "truck",
    },
    {
      id: 3,
      title: "Razmerni almashtirish",
      desc: "Razmer mos kelmasa, 24 soat ichida hech qanday ortiqcha savollarsiz almashtirib beramiz.",
      icon: "refresh",
    },
    {
      id: 4,
      title: "Haqiqiy rasmlar",
      desc: "Barcha suratlar o'zimizning studiyamizda olingan — buyurtmangiz aynan rasmdek keladi.",
      icon: "camera",
    },
  ],

  // Kategoriyalar ro'yxati (Hero ostidagi chip-filtrlar va katalog uchun)
  categories: [
    { id: "all", name: "Hammasi" },
    { id: "krossovka", name: "Krossovka" },
    { id: "tufli", name: "Tufli" },
    { id: "botinka", name: "Botinka" },
    { id: "kedi", name: "Kedi" },
    { id: "sandal", name: "Sandal" },
    { id: "bolalar", name: "Bolalar" },
  ],

  // Standart razmerlar jadvali
  availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
};
