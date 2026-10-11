/**
 * ====================================================================
 * MAHSULOTLAR RO'YXATI / PRODUCTS CATALOG (DATA)
 * ====================================================================
 * Yangi mahsulotlar qo'shish, narxlarni o'zgartirish yoki rasmlarni yangilash
 * faqat ushbu faylda amalga oshiriladi.
 */

export const products = [
  {
    id: "nike-air-force-1",
    name: "Nike Air Force 1 '07 Low Triple White",
    brand: "Nike",
    category: "krossovka",
    categoryName: "Krossovka",
    price: 680000,
    oldPrice: 850000,
    discount: "-20%",
    rating: 4.9,
    reviewsCount: 48,
    isNew: true,
    isFeatured: true,
    images: [
      "/products/p1.jpg",
      "/products/p1-alt.jpg",
    ],
    // Mavjud razmerlar
    sizes: [39, 40, 41, 42, 43, 44],
    // Do'kondagi barcha razmer diapazoni (mavjud bo'lmaganlari o'chirilgan ko'rsatiladi)
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Oq", hex: "#FFFFFF", border: true },
      { name: "Qora", hex: "#111111" },
    ],
    description: "Klassik oq charm, mustahkam taglik va amortizatsiya texnologiyasiga ega afsonaviy Nike Air Force 1. Har qanday kiyim uslubiga mos keladigan universal tanlov.",
    features: [
      "100% haqiqiy tabiiy charm",
      "Nike Air havo yostig'i amortizatsiyasi",
      "Nafas oluvchi teshikchalar",
      "Sirpanmaydigan qalin kauchuk taglik"
    ]
  },
  {
    id: "adidas-samba-og",
    name: "Adidas Samba OG White Black Gum",
    brand: "Adidas",
    category: "krossovka",
    categoryName: "Krossovka",
    price: 720000,
    oldPrice: 900000,
    discount: "-20%",
    rating: 4.9,
    reviewsCount: 36,
    isNew: true,
    isFeatured: true,
    images: [
      "/products/p2.jpg",
      "/products/p2-alt.jpg",
    ],
    sizes: [38, 39, 40, 41, 42, 43],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Oq-qora", hex: "#F3F3F3", border: true },
      { name: "Qora-oq", hex: "#111111" },
    ],
    description: "Retro uslubning cho'qqisi. Zamsh T-burun qismi, uchta charm chiziq va tabiiy kauchuk (gum) taglik bilan jihozlangan eng ommabop krossovka modeli.",
    features: [
      "Yumshoq charm va tabiiy zamsh qoplamasi",
      "Klassik T-toe dizayni",
      "Oltin rangli SAMBA yozuvi",
      "Yengil va egiluvchan taglik"
    ]
  },
  {
    id: "loro-piana-open-walk",
    name: "Loro Piana Open Walk Zamsh Mokasin",
    brand: "Loro Piana",
    category: "tufli",
    categoryName: "Tufli",
    price: 1150000,
    oldPrice: 1450000,
    discount: "-21%",
    rating: 5.0,
    reviewsCount: 29,
    isNew: false,
    isFeatured: true,
    images: [
      "/products/p3.jpg",
      "/products/p3-alt.jpg",
    ],
    sizes: [40, 41, 42, 43, 44],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Qumrang (Bej)", hex: "#C8B29B" },
      { name: "To'q ko'k", hex: "#1A2536" },
      { name: "Shokolad", hex: "#3B2516" },
    ],
    description: "Italiya premium uslubidagi elita mokasin. Suv o'tkazmaydigan nozik zamsh va maxsus oq kauchuk taglik bilan qulaylik va hashamatni his qiling.",
    features: [
      "Suvdan himoyalangan tabiiy italyan zamshi",
      "Yashirin elastik qisqich (bog'ichsiz qulay kiyish)",
      "Orqa tarafida buyurtmachi ismi yozish uchun maxsus joy",
      "Ultra-yengil kauchuk taglik"
    ]
  },
  {
    id: "clarks-desert-boot",
    name: "Clarks Desert Boot Zamsh Qora Charm",
    brand: "Clarks",
    category: "botinka",
    categoryName: "Botinka",
    price: 890000,
    oldPrice: 1100000,
    discount: "-19%",
    rating: 4.8,
    reviewsCount: 19,
    isNew: false,
    isFeatured: false,
    images: [
      "/products/p4.jpg",
      "/products/p4-alt.jpg",
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Qora", hex: "#222222" },
      { name: "Jigarrang", hex: "#5C4033" },
    ],
    description: "1950-yildan buyon o'zgarmas ingliz klassikasi. Tabiiy krep taglik va qulay to'piq balandligi bilan kuz-bahor mavsumi uchun ideal tanlov.",
    features: [
      "Angliya andozasi bo'yicha tikilgan",
      "Tabiiy krep (xom kauchuk) taglik",
      "2 qatorli minimalist bog'ich",
      "Nafas oluvchi ichki charm astar"
    ]
  },
  {
    id: "new-balance-574",
    name: "New Balance 574 Grey Heritage Sneaker",
    brand: "New Balance",
    category: "krossovka",
    categoryName: "Krossovka",
    price: 640000,
    oldPrice: 800000,
    discount: "-20%",
    rating: 4.9,
    reviewsCount: 52,
    isNew: true,
    isFeatured: true,
    images: [
      "/products/p5.jpg",
      "/products/p5-alt.jpg",
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Kulrang", hex: "#7D8285" },
      { name: "Qora", hex: "#1C1C1C" },
      { name: "To'q ko'k", hex: "#1E293B" },
    ],
    description: "New Balance brendining eng qulay va uzoq vaqt xizmat qiladigan modeli. ENCAP oraliq tagligi uzoq vaqt piyoda yurganda ham oyoqni toliqtirmaydi.",
    features: [
      "ENCAP ikki qatlamli amortizatsiya texnologiyasi",
      "Yuqori sifatli zamsh va mustahkam to'rli mato",
      "Keng qulay qolip (har qanday oyoqqa mos)",
      "Yorug'lik qaytaruvchi 'N' logotipi"
    ]
  },
  {
    id: "converse-chuck-70",
    name: "Converse Chuck 70 Classic High Top",
    brand: "Converse",
    category: "kedi",
    categoryName: "Kedi",
    price: 490000,
    oldPrice: 620000,
    discount: "-21%",
    rating: 4.8,
    reviewsCount: 41,
    isNew: false,
    isFeatured: false,
    images: [
      "/products/p6.jpg",
      "/products/p6-alt.jpg",
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Qora", hex: "#111111" },
      { name: "Oq", hex: "#F5F5F0", border: true },
      { name: "Qizil", hex: "#C52222" },
    ],
    description: "70-yillarning og'irroq 12oz brezent matosidan tikilgan takomillashtirilgan premium kedi. Qalinroq laklangan taglik va yumshoq Ortholite patagi mavjud.",
    features: [
      "Zich 12oz paxtali kanvas mato",
      "Yumshoq OrthoLite patak",
      "Qo'shimcha yon tikuv mustahkamlagichi",
      "Klassik yulduzli vintage timsol"
    ]
  },
  {
    id: "dr-martens-1460",
    name: "Dr. Martens 1460 Smooth Leather 8-Eye",
    brand: "Dr. Martens",
    category: "botinka",
    categoryName: "Botinka",
    price: 1250000,
    oldPrice: 1600000,
    discount: "-22%",
    rating: 4.9,
    reviewsCount: 26,
    isNew: true,
    isFeatured: true,
    images: [
      "/products/p7.jpg",
      "/products/p7-alt.jpg",
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Qora Smooth", hex: "#111111" },
      { name: "Gilos rang (Oxblood)", hex: "#521623" },
    ],
    description: "Afsonaviy 8 teshikli ingliz botinkasi. Mashhur sariq chok, moy va kislotaga chidamli AirWair taglik va yillar davomida kiyiladigan pishiq charm.",
    features: [
      "Goodyear Welt issiqlik bilan payvandlangan chok",
      "Havo yostiqchali AirWair taglik",
      "Klassik sariq rangli tikuv iplari",
      "Qattiq va shaklini yo'qotmaydigan qalin charm"
    ]
  },
  {
    id: "zara-oxford-classic",
    name: "Zara Classic Cap-Toe Oxford Tufli",
    brand: "Zara",
    category: "tufli",
    categoryName: "Tufli",
    price: 580000,
    oldPrice: 750000,
    discount: "-23%",
    rating: 4.7,
    reviewsCount: 22,
    isNew: false,
    isFeatured: false,
    images: [
      "/products/p8.jpg",
      "/products/p8-alt.jpg",
    ],
    sizes: [40, 41, 42, 43, 44],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Konyak jigarrang", hex: "#6E3615" },
      { name: "Klassik qora", hex: "#111111" },
    ],
    description: "Kostyum-shim va rasmiy tadbirlar uchun zarur bo'lgan elegant Oksford tuflisi. Yaltiroq jiloli tabiiy charm va qat'iy Cap-toe uchi.",
    features: [
      "Klassik yopiq bog'ich (Closed lacing)",
      "Cap-toe burun choki",
      "Yog'och teksturali elegant poshna",
      "Ergonomik ichki taglik"
    ]
  },
  {
    id: "birkenstock-arizona",
    name: "Birkenstock Arizona EVA Sandal Slide",
    brand: "Birkenstock",
    category: "sandal",
    categoryName: "Sandal",
    price: 360000,
    oldPrice: 480000,
    discount: "-25%",
    rating: 4.9,
    reviewsCount: 38,
    isNew: false,
    isFeatured: false,
    images: [
      "/products/p9.jpg",
      "/products/p9-alt.jpg",
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "To'q kulrang", hex: "#38332E" },
      { name: "Zaytun yashil", hex: "#4C5441" },
      { name: "Qora", hex: "#111111" },
    ],
    description: "Yoz faslining ajralmas qulay sandali. Oyoq kaftining tabiiy anatomiyasini to'liq takrorlovchi shakl va sozlanuvchi ikkita qisqich.",
    features: [
      "Anatomik chuqurlashtirilgan tovon o'rni",
      "Suvga chidamli yengil material",
      "Ikkita sozlanuvchi metall to'qa",
      "Yozgi jaziramada eng yengil va qulay"
    ]
  },
  {
    id: "timberland-6-inch",
    name: "Timberland 6-Inch Premium Wheat Boot",
    brand: "Timberland",
    category: "botinka",
    categoryName: "Botinka",
    price: 1380000,
    oldPrice: 1750000,
    discount: "-21%",
    rating: 5.0,
    reviewsCount: 44,
    isNew: true,
    isFeatured: true,
    images: [
      "/products/p10.jpg",
      "/products/p10-alt.jpg",
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Bug'doyrang (Wheat)", hex: "#DDA04B" },
      { name: "Qora matviy", hex: "#1C1C1C" },
    ],
    description: "Mashhur 'sariq botinka'. Suv o'tkazmaydigan qattiq nubuk charm, qulay yumshoq bo'yin qismi va qishning har qanday qor-muziga bardosh beruvchi tishli taglik.",
    features: [
      "100% suv o'tkazmaydigan germetik choklar",
      "Primaloft issiqlik saqlovchi astar",
      "Yumshoq charm yoqacha",
      "Zanglamaydigan oltin qotishma ko'zlar"
    ]
  },
  {
    id: "vans-old-skool",
    name: "Vans Old Skool Suede Black White",
    brand: "Vans",
    category: "kedi",
    categoryName: "Kedi",
    price: 460000,
    oldPrice: 580000,
    discount: "-21%",
    rating: 4.8,
    reviewsCount: 50,
    isNew: false,
    isFeatured: false,
    images: [
      "/products/p11.jpg",
      "/products/p11-alt.jpg",
    ],
    sizes: [37, 38, 39, 40, 41, 42, 43],
    allSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "Qora-oq", hex: "#181818" },
      { name: "Ko'k-oq", hex: "#1E3A8A" },
    ],
    description: "Kaliforniya skeyt madaniyatining ramzi. Bardoshli zamsh va kanvas qoplamasi, oq 'jazz stripe' chizig'i va o'zgarmas vafli taglik.",
    features: [
      "Mustahkamlangan zamsh burun va tovon",
      "Vans Waffle sirpanmas taglik",
      "To'piqni himoyalovchi yumshoq yoqa",
      "Har kuni kiyishga nihoyatda chidamli"
    ]
  },
  {
    id: "air-jordan-1-kids",
    name: "Air Jordan 1 Low Kids Chicago Red",
    brand: "Jordan",
    category: "bolalar",
    categoryName: "Bolalar",
    price: 420000,
    oldPrice: 550000,
    discount: "-24%",
    rating: 4.9,
    reviewsCount: 31,
    isNew: true,
    isFeatured: true,
    images: [
      "/products/p12.jpg",
      "/products/p12-alt.jpg",
    ],
    sizes: [32, 33, 34, 35, 36, 37],
    allSizes: [30, 31, 32, 33, 34, 35, 36, 37, 38],
    colors: [
      { name: "Chicago qizil-oq", hex: "#D02027" },
      { name: "Royal moviy", hex: "#1D4ED8" },
    ],
    description: "Bolalar uchun maxsus ishlab chiqilgan, oyoqni to'g'ri shakllantiruvchi qulay va yorqin krossovka. Yengil elastik taglik va oson kiyiladigan qolip.",
    features: [
      "Bolalar oyog'i uchun xavfsiz yumshoq taglik",
      "Bardoshli va oson tozalanadigan sintetik charm",
      "Yorqin Chicago qizil-oq dizayni",
      "Maxsus sirpanmaydigan protektor"
    ]
  }
];

// Yordamchi funksiya: Narxni chiroyli so'm formatida ko'rsatish.
// Raqamlar orasidagi bo'shliq "qatlamas bo'shliq" (U+00A0) — narx qatorlar bo'lib ketmaydi.
export const formatPrice = (price) => {
  if (!price && price !== 0) return "0 so'm";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + "\u00A0so'm";
};
