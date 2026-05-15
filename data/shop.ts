export type ProductCategory = 'Сонячні панелі' | 'Інвертори' | 'Акумулятори' | 'Системи зберігання' | 'Комплектуючі';

export type ProductAvailability = 'available' | 'preorder' | 'out_of_stock';

export type Product = {
  slug: string;
  title: string;
  category: ProductCategory;
  brand: string;
  availability?: ProductAvailability;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  shortDescription: string;
  description: string;
  specs: string[];
  badges: string[];
};

export type CaseItem = {
  slug: string;
  title: string;
  segment: string;
  location: string;
  result: string;
  system: string;
  image: string;
};

export type GeneratorPackKey = 'apartment' | 'house' | 'business';

export type GeneratorPack = {
  key: GeneratorPackKey;
  title: string;
  objectLabel: string;
  generationPower: number;
  summary: string;
  composition: Array<{ slug: string; qty: number }>;
};

export type BrandLogo = {
  name: string;
  logoUrl: string;
};

export const products: Product[] = [
  {
    slug: "deye-sun-05k-sg05lp1-eu-am2-plus-deye-wifi-5-kw-1-фаза-2-mppt-lv",
    title: "SUN-05K-SG05LP1-EU-AM2-PLUS Deye WiFi (5 kW, 1 фаза, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-05k-sg05lp1-eu-am2-plus-deye-wifi.png",
    shortDescription: "Deye SUN-05K-SG05LP1-EU-AM2-PLUS WiFi (5 kW, 1 фаза, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-05K-SG05LP1-EU-AM2-PLUS WiFi (5 kW, 1 фаза, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-05K-SG05LP1-EU-AM2-PLUS Deye WiFi (5 kW, 1 фаза, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 5 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Немає в наявності",
      "Deye",
      "Гібридний",
      "LV"
    ]
  },
  {
    slug: "deye-sun-06k-sg05lp1-eu-deye-wifi-6-kw-1-фаза-2-mppt-lv",
    title: "SUN-06K-SG05LP1-EU Deye WiFi (6 kW, 1 фаза, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-06k-sg05lp1-eu.png",
    shortDescription: "Deye SUN-06K-SG05LP1-EU WiFi (6 kW, 1 фаза, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-06K-SG05LP1-EU WiFi (6 kW, 1 фаза, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-06K-SG05LP1-EU Deye WiFi (6 kW, 1 фаза, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 6 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "6 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-08k-sg01lp1-eu-wifi-8-kw-1-фаза-2-mppt-lv",
    title: "Deye SUN-08K-SG01LP1-EU WiFi (8 kW, 1 фаза, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-08k-sg01lp1-eu.png",
    shortDescription: "Deye SUN-08K-SG01LP1-EU WiFi (8 kW, 1 фаза, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-08K-SG01LP1-EU WiFi (8 kW, 1 фаза, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-08K-SG01LP1-EU WiFi (8 kW, 1 фаза, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 8 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "8 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-10k-sg02lp1-eu-am3-deye-wifi-10-kw-1-фаза-3-mppt-lv",
    title: "SUN-10K-SG02LP1-EU-AM3 Deye WiFi (10 kW, 1 фаза, 3 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-10k-sg02lp1-eu-am3.png",
    shortDescription: "Deye SUN-10K-SG02LP1-EU-AM3 WiFi (10 kW, 1 фаза, 3 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-10K-SG02LP1-EU-AM3 WiFi (10 kW, 1 фаза, 3 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-10K-SG02LP1-EU-AM3 Deye WiFi (10 kW, 1 фаза, 3 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 10 kW, 3 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "10 kW",
      "3 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-10k-sg05lp3-eu-deye-wifi-10-kw-3-фази-2-mppt-lv",
    title: "SUN-10K-SG05LP3-EU Deye WiFi (10 kW, 3 фази, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-10k-sg05lp3-eu.png",
    shortDescription: "Deye SUN-10K-SG05LP3-EU WiFi (10 kW, 3 фази, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-10K-SG05LP3-EU WiFi (10 kW, 3 фази, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-10K-SG05LP3-EU Deye WiFi (10 kW, 3 фази, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 10 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "10 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-12k-sg02lp1-eu-am3-deye-wifi-12-kw-1-фаза-3-mppt-lv",
    title: "SUN-12K-SG02LP1-EU-AM3 Deye WiFi (12 kW, 1 фаза, 3 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-12k-sg02lp1-eu-am3.png",
    shortDescription: "Deye SUN-12K-SG02LP1-EU-AM3 WiFi (12 kW, 1 фаза, 3 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-12K-SG02LP1-EU-AM3 WiFi (12 kW, 1 фаза, 3 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-12K-SG02LP1-EU-AM3 Deye WiFi (12 kW, 1 фаза, 3 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 12 kW, 3 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "12 kW",
      "3 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-12k-sg04lp3-eu-wifi-12-kw-3-фази-2-mppt-lv",
    title: "Deye SUN-12K-SG04LP3-EU WiFi (12 kW, 3 фази, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-12k-sg04lp3-eu.png",
    shortDescription: "Deye SUN-12K-SG04LP3-EU WiFi (12 kW, 3 фази, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-12K-SG04LP3-EU WiFi (12 kW, 3 фази, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-12K-SG04LP3-EU WiFi (12 kW, 3 фази, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 12 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "12 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-12k-sg05lp3-eu-sm2-deye-wifi-12-kw-3-фази-2-mppt-lv",
    title: "SUN-12K-SG05LP3-EU-SM2 Deye WiFi (12 kW, 3 фази, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-12k-sg05lp3-eu-sm2.png",
    shortDescription: "Deye SUN-12K-SG05LP3-EU-SM2 WiFi (12 kW, 3 фази, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-12K-SG05LP3-EU-SM2 WiFi (12 kW, 3 фази, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-12K-SG05LP3-EU-SM2 Deye WiFi (12 kW, 3 фази, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 12 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "12 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-15k-sg05lp3-eu-sm2-deye-wifi-15-kw-3-фази-2-mppt-lv",
    title: "SUN-15K-SG05LP3-EU-SM2 Deye WiFi (15 kW, 3 фази, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-15k-sg05lp3-eu-sm2.png",
    shortDescription: "Deye SUN-15K-SG05LP3-EU-SM2 WiFi (15 kW, 3 фази, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-15K-SG05LP3-EU-SM2 WiFi (15 kW, 3 фази, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-15K-SG05LP3-EU-SM2 Deye WiFi (15 kW, 3 фази, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 15 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "15 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-16k-sg01lp1-eu-deye-wifi-16-kw-1-фаза-3-mppt-lv",
    title: "SUN-16K-SG01LP1-EU Deye WiFi (16 kW, 1 фаза, 3 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-16k-sg01lp1-eu.png",
    shortDescription: "Deye SUN-16K-SG01LP1-EU WiFi (16 kW, 1 фаза, 3 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-16K-SG01LP1-EU WiFi (16 kW, 1 фаза, 3 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-16K-SG01LP1-EU Deye WiFi (16 kW, 1 фаза, 3 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 16 kW, 3 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "16 kW",
      "3 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-16k-sg05lp3-eu-sm2-deye-wifi-16-kw-3-фази-2-mppt-lv",
    title: "SUN-16K-SG05LP3-EU-SM2 Deye WiFi (16 kW, 3 фази, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-16k-sg05lp3-eu-sm2.png",
    shortDescription: "Deye SUN-16K-SG05LP3-EU-SM2 WiFi (16 kW, 3 фази, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-16K-SG05LP3-EU-SM2 WiFi (16 kW, 3 фази, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-16K-SG05LP3-EU-SM2 Deye WiFi (16 kW, 3 фази, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 16 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "16 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-20k-sg05lp3-eu-sm2-deye-wifi-20-kw-3-фази-2-mppt-lv",
    title: "SUN-20K-SG05LP3-EU-SM2 Deye WiFi (20 kW, 3 фази, 2 MPPT, LV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-20k-sg05lp3-eu-sm2.png",
    shortDescription: "Deye SUN-20K-SG05LP3-EU-SM2 WiFi (20 kW, 3 фази, 2 MPPT, LV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-20K-SG05LP3-EU-SM2 WiFi (20 kW, 3 фази, 2 MPPT, LV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-20K-SG05LP3-EU-SM2 Deye WiFi (20 kW, 3 фази, 2 MPPT, LV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 20 kW, 2 MPPT, LV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "20 kW",
      "2 MPPT",
      "LV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "LV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-20k-sg01hp3-eu-am2-deye-wifi-20-kw-3-фази-2-mppt-hv",
    title: "SUN-20K-SG01HP3-EU-AM2 Deye WiFi (20 kW, 3 фази, 2 MPPT, HV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-20k-sg01hp3-eu-am2.png",
    shortDescription: "Deye SUN-20K-SG01HP3-EU-AM2 WiFi (20 kW, 3 фази, 2 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-20K-SG01HP3-EU-AM2 WiFi (20 kW, 3 фази, 2 MPPT, HV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-20K-SG01HP3-EU-AM2 Deye WiFi (20 kW, 3 фази, 2 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 20 kW, 2 MPPT, HV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "20 kW",
      "2 MPPT",
      "HV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-30k-sg02hp3-eu-am2-deye-wifi-30-kw-3-фази-3-mppt-hv",
    title: "SUN-30K-SG02HP3-EU-AM2 Deye WiFi (30 kW, 3 фази, 3 MPPT, HV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-30k-sg02hp3-eu-am2.png",
    shortDescription: "Deye SUN-30K-SG02HP3-EU-AM2 WiFi (30 kW, 3 фази, 3 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-30K-SG02HP3-EU-AM2 WiFi (30 kW, 3 фази, 3 MPPT, HV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-30K-SG02HP3-EU-AM2 Deye WiFi (30 kW, 3 фази, 3 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 30 kW, 3 MPPT, HV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "30 kW",
      "3 MPPT",
      "HV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-30k-sg01hp3-eu-bm3-deye-wifi-30-kw-3-фази-3-mppt-hv",
    title: "SUN-30K-SG01HP3-EU-BM3 Deye WiFi (30 kW, 3 фази, 3 MPPT, HV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-30k-sg01hp3-eu-bm3.png",
    shortDescription: "Deye SUN-30K-SG01HP3-EU-BM3 WiFi (30 kW, 3 фази, 3 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-30K-SG01HP3-EU-BM3 WiFi (30 kW, 3 фази, 3 MPPT, HV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-30K-SG01HP3-EU-BM3 Deye WiFi (30 kW, 3 фази, 3 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 30 kW, 3 MPPT, HV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "30 kW",
      "3 MPPT",
      "HV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-40k-sg01hp3-eu-bm4-deye-wifi-40-kw-3-фази-4-mppt-hv",
    title: "SUN-40K-SG01HP3-EU-BM4 Deye WiFi (40 kW, 3 фази, 4 MPPT, HV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-40k-sg01hp3-eu-bm4.png",
    shortDescription: "Deye SUN-40K-SG01HP3-EU-BM4 WiFi (40 kW, 3 фази, 4 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-40K-SG01HP3-EU-BM4 WiFi (40 kW, 3 фази, 4 MPPT, HV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-40K-SG01HP3-EU-BM4 Deye WiFi (40 kW, 3 фази, 4 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 40 kW, 4 MPPT, HV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "40 kW",
      "4 MPPT",
      "HV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-50k-sg01hp3-eu-bm4-deye-wifi-50-kw-3-фази-4-mppt-hv",
    title: "SUN-50K-SG01HP3-EU-BM4 Deye WiFi (50 kW, 3 фази, 4 MPPT, HV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-50k-sg01hp3-eu-bm4.png",
    shortDescription: "Deye SUN-50K-SG01HP3-EU-BM4 WiFi (50 kW, 3 фази, 4 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-50K-SG01HP3-EU-BM4 WiFi (50 kW, 3 фази, 4 MPPT, HV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-50K-SG01HP3-EU-BM4 Deye WiFi (50 kW, 3 фази, 4 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 50 kW, 4 MPPT, HV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "50 kW",
      "4 MPPT",
      "HV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-60k-sg02hp3-eu-em6-deye-wifi-60-kw-3-фази-6-mppt-hv",
    title: "SUN-60K-SG02HP3 -EU-EM6 Deye WiFi (60 kW, 3 фази, 6 MPPT, HV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-60k-sg02hp3-eu-em6.png",
    shortDescription: "Deye SUN-60K-SG02HP3 -EU-EM6 WiFi (60 kW, 3 фази, 6 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-60K-SG02HP3 -EU-EM6 WiFi (60 kW, 3 фази, 6 MPPT, HV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-60K-SG02HP3 -EU-EM6 Deye WiFi (60 kW, 3 фази, 6 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 60 kW, 6 MPPT, HV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "60 kW",
      "6 MPPT",
      "HV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-75k-sg02hp3-eu-em6-deye-wifi-75-kw-3-фази-6-mppt-hv",
    title: "SUN-75K-SG02HP3 -EU-EM6 Deye WiFi (75 kW, 3 фази, 6 MPPT, HV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-75k-sg02hp3-eu-em6.png",
    shortDescription: "Deye SUN-75K-SG02HP3 -EU-EM6 WiFi (75 kW, 3 фази, 6 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-75K-SG02HP3 -EU-EM6 WiFi (75 kW, 3 фази, 6 MPPT, HV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-75K-SG02HP3 -EU-EM6 Deye WiFi (75 kW, 3 фази, 6 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 75 kW, 6 MPPT, HV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "75 kW",
      "6 MPPT",
      "HV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-80k-sg02hp3-eu-em6-deye-wifi-80-kw-3-фази-6-mppt-hv",
    title: "SUN-80K-SG02HP3-EU-EM6 Deye WiFi (80 kW, 3 фази, 6 MPPT, HV)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-80k-sg02hp3-eu-em6.png",
    shortDescription: "Deye SUN-80K-SG02HP3-EU-EM6 WiFi (80 kW, 3 фази, 6 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-80K-SG02HP3-EU-EM6 WiFi (80 kW, 3 фази, 6 MPPT, HV) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». SUN-80K-SG02HP3-EU-EM6 Deye WiFi (80 kW, 3 фази, 6 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 80 kW, 6 MPPT, HV, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "80 kW",
      "6 MPPT",
      "HV",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-6k-g-deye-wifi-6-kw-1-фаза-2-mppt",
    title: "SUN-6K-G Deye WiFi (6 kW, 1 фаза, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-06k-g.png",
    shortDescription: "Deye SUN-6K-G WiFi (6 kW, 1 фаза, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-6K-G WiFi (6 kW, 1 фаза, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-6K-G Deye WiFi (6 kW, 1 фаза, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 6 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "6 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-8k-g-deye-wifi-8-kw-1-фаза-2-mppt",
    title: "SUN-8K-G Deye WiFi (8 kW, 1 фаза, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-8k-g.png",
    shortDescription: "Deye SUN-8K-G WiFi (8 kW, 1 фаза, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-8K-G WiFi (8 kW, 1 фаза, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-8K-G Deye WiFi (8 kW, 1 фаза, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 8 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "8 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-10k-g-deye-wifi-10-kw-1-фаза-2-mppt",
    title: "SUN-10K-G Deye WiFi (10 kW, 1 фаза, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-10k-g.png",
    shortDescription: "Deye SUN-10K-G WiFi (10 kW, 1 фаза, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-10K-G WiFi (10 kW, 1 фаза, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-10K-G Deye WiFi (10 kW, 1 фаза, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 10 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "10 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-10k-g06p3-eu-am2-deye-wifi-10-kw-3-фази-2-mppt",
    title: "SUN-10K-G06P3-EU-AM2 Deye WiFi (10 kW, 3 фази, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-10k-g06p3-eu-am2.png",
    shortDescription: "Deye SUN-10K-G06P3-EU-AM2 WiFi (10 kW, 3 фази, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-10K-G06P3-EU-AM2 WiFi (10 kW, 3 фази, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-10K-G06P3-EU-AM2 Deye WiFi (10 kW, 3 фази, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 10 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "10 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Мережевий",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-12k-g06-deye-wifi-12-kw-3-фази-2-mppt",
    title: "SUN-12K-G06 Deye WiFi (12 kW, 3 фази, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-12k-g06.png",
    shortDescription: "Deye SUN-12K-G06 WiFi (12 kW, 3 фази, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-12K-G06 WiFi (12 kW, 3 фази, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-12K-G06 Deye WiFi (12 kW, 3 фази, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 12 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "12 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Мережевий",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-15k-g05-deye-wifi-15-kw-3-фази-2-mppt",
    title: "SUN-15K-G05 Deye WiFi (15 kW, 3 фази, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-15k-g05.png",
    shortDescription: "Deye SUN-15K-G05 WiFi (15 kW, 3 фази, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-15K-G05 WiFi (15 kW, 3 фази, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-15K-G05 Deye WiFi (15 kW, 3 фази, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 15 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "15 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Мережевий",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-15k-g06-deye-wifi-15-kw-3-фази-2-mppt",
    title: "SUN-15K-G06 Deye WiFi (15 kW, 3 фази, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-15k-g06.png",
    shortDescription: "Deye SUN-15K-G06 WiFi (15 kW, 3 фази, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-15K-G06 WiFi (15 kW, 3 фази, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-15K-G06 Deye WiFi (15 kW, 3 фази, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 15 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "15 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-20k-g05-deye-wifi-20-kw-3-фази-2-mppt",
    title: "SUN-20K-G05 Deye WiFi (20 kW, 3 фази, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-20k-g05.png",
    shortDescription: "Deye SUN-20K-G05 WiFi (20 kW, 3 фази, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-20K-G05 WiFi (20 kW, 3 фази, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-20K-G05 Deye WiFi (20 kW, 3 фази, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 20 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "20 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-25k-g04-deye-wifi-25-kw-3-фази-2-mppt",
    title: "SUN-25K-G04 Deye WiFi (25 kW, 3 фази, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-25k-g04.png",
    shortDescription: "Deye SUN-25K-G04 WiFi (25 kW, 3 фази, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-25K-G04 WiFi (25 kW, 3 фази, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-25K-G04 Deye WiFi (25 kW, 3 фази, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 25 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "25 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-25k-g05-deye-wifi-25-kw-3-фази-2-mppt",
    title: "SUN-25K-G05 Deye WiFi (25 kW, 3 фази, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-25k-g05.png",
    shortDescription: "Deye SUN-25K-G05 WiFi (25 kW, 3 фази, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-25K-G05 WiFi (25 kW, 3 фази, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-25K-G05 Deye WiFi (25 kW, 3 фази, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 25 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "25 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-30-g04-deye-wifi-30-kw-3-фази-2-mppt",
    title: "SUN-30-G04 Deye WiFi (30 kW, 3 фази, 2 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-30-g04.png",
    shortDescription: "Deye SUN-30-G04 WiFi (30 kW, 3 фази, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-30-G04 WiFi (30 kW, 3 фази, 2 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-30-G04 Deye WiFi (30 kW, 3 фази, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 30 kW, 2 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "30 kW",
      "2 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-50k-g04-deye-wifi-50-kw-3-фази-4-mppt",
    title: "SUN-50K-G04 Deye WiFi (50 kW, 3 фази, 4 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-50k-g04.png",
    shortDescription: "Deye SUN-50K-G04 WiFi (50 kW, 3 фази, 4 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-50K-G04 WiFi (50 kW, 3 фази, 4 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-50K-G04 Deye WiFi (50 kW, 3 фази, 4 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 50 kW, 4 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "50 kW",
      "4 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-80k-g-deye-wifi-80-kw-3-фази-4-mppt",
    title: "SUN-80K-G Deye WiFi (80 kW, 3 фази, 4 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-80k-g.png",
    shortDescription: "Deye SUN-80K-G WiFi (80 kW, 3 фази, 4 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-80K-G WiFi (80 kW, 3 фази, 4 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-80K-G Deye WiFi (80 kW, 3 фази, 4 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 80 kW, 4 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "80 kW",
      "4 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-100k-g03-deye-wifi-100-kw-3-фази-6-mppt",
    title: "SUN-100K-G03 Deye WiFi (100 kW, 3 фази, 6 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-100k-g03.png",
    shortDescription: "Deye SUN-100K-G03 WiFi (100 kW, 3 фази, 6 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-100K-G03 WiFi (100 kW, 3 фази, 6 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-100K-G03 Deye WiFi (100 kW, 3 фази, 6 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 100 kW, 6 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "100 kW",
      "6 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-sun-125k-g-deye-wifi-125-kw-3-фази-8-mppt",
    title: "SUN-125K-G Deye WiFi (125 kW, 3 фази, 8 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-125k-g.png",
    shortDescription: "Deye SUN-125K-G WiFi (125 kW, 3 фази, 8 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-125K-G WiFi (125 kW, 3 фази, 8 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-125K-G Deye WiFi (125 kW, 3 фази, 8 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 125 kW, 8 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "125 kW",
      "8 MPPT",
      "WiFi"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Мережевий",
      "Очікується"
    ]
  },
  {
    slug: "deye-sun-135k-g-deye-wifi-135-kw-3-фази-8-mppt",
    title: "SUN-135K-G Deye WiFi (135 kW, 3 фази, 8 MPPT)",
    category: "Інвертори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-135k-g.png",
    shortDescription: "Deye SUN-135K-G WiFi (135 kW, 3 фази, 8 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель SUN-135K-G WiFi (135 kW, 3 фази, 8 MPPT) бренду Deye з прайсу 27.04, розділ «ІНВЕРТОРИ МЕРЕЖЕВІ». SUN-135K-G Deye WiFi (135 kW, 3 фази, 8 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 135 kW, 8 MPPT, WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "135 kW",
      "8 MPPT",
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Мережевий"
    ]
  },
  {
    slug: "deye-se-g5-1-pro-b-lifepo4-51-2v-100ah",
    title: "Deye SE-G5.1 Pro-B LiFePO4 51,2V 100Ah",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/se-g5-1-pro-b-lifepo4-100ah.png",
    shortDescription: "Deye SE-G5.1 Pro-B LiFePO4 51,2V 100Ah: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення SE-G5.1 Pro-B LiFePO4 51,2V 100Ah бренду Deye з прайсу 27.04. SE-G5.1 Pro-B LiFePO4 51,2V 100Ah Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-rw-f16-lifepo4-lv-51-2v-314ah-16kwh",
    title: "Deye RW-F16 LiFePO4 LV 51.2V 314Ah 16kWh",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/deye-rw-f16-lifepo4-lv-51-2v-314ah-16kwh.png",
    shortDescription: "Deye RW-F16 LiFePO4 LV 51.2V 314Ah 16kWh: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення RW-F16 LiFePO4 LV 51.2V 314Ah 16kWh бренду Deye з прайсу 27.04. RW-F16 LiFePO4 LV 51.2V 314Ah 16kWh Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 16kWh, LiFePO4, 51.2V, 314Ah, LV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "16kWh",
      "LiFePO4",
      "51.2V",
      "314Ah",
      "LV"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "LV",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-rw-m6-1-deye-lifepo4-51-2v-100ah-6-14kwh",
    title: "RW-M6.1 Deye (LiFePO4 51,2V 100Ah 6,14kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/rw-m6-1-deye.png",
    shortDescription: "Deye RW-M6.1 (LiFePO4 51,2V 100Ah 6,14kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення RW-M6.1 (LiFePO4 51,2V 100Ah 6,14kWh) бренду Deye з прайсу 27.04. RW-M6.1 Deye (LiFePO4 51,2V 100Ah 6,14kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 6,14kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "6,14kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Немає в наявності",
      "Deye",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-bos-a-pack7-68-deye-high-voltage-lifepo4-38-4v-200ah-7-68kwh",
    title: "BOS-A-Pack7.68 Deye (High-Voltage LiFePO4 38,4V 200Ah 7,68kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-a-pack7-68.png",
    shortDescription: "Deye BOS-A-Pack7.68 (High-Voltage LiFePO4 38,4V 200Ah 7,68kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення BOS-A-Pack7.68 (High-Voltage LiFePO4 38,4V 200Ah 7,68kWh) бренду Deye з прайсу 27.04. BOS-A-Pack7.68 Deye (High-Voltage LiFePO4 38,4V 200Ah 7,68kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 7,68kWh, LiFePO4, 38,4V, 200Ah, HV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "7,68kWh",
      "LiFePO4",
      "38,4V",
      "200Ah",
      "HV"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "HV",
      "LiFePO4",
      "Очікується"
    ]
  },
  {
    slug: "deye-bos-gpack5-1-deye-high-voltage-lifepo4-51-2v-100ah-5-12kwh",
    title: "BOS-GPack5.1 Deye (High-Voltage LiFePO4 51,2V 100Ah 5,12kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-gpack5-1-deye.png",
    shortDescription: "Deye BOS-GPack5.1 (High-Voltage LiFePO4 51,2V 100Ah 5,12kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення BOS-GPack5.1 (High-Voltage LiFePO4 51,2V 100Ah 5,12kWh) бренду Deye з прайсу 27.04. BOS-GPack5.1 Deye (High-Voltage LiFePO4 51,2V 100Ah 5,12kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5,12kWh, LiFePO4, 51,2V, 100Ah, HV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5,12kWh",
      "LiFePO4",
      "51,2V",
      "100Ah",
      "HV"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "HV",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-bos-b-pack14-3-deye-high-voltage-lifepo4-51-2v-280ah-14-3kwh",
    title: "BOS-B-Pack14.3 Deye (High-Voltage LiFePO4 51,2V 280Ah 14,3kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-b-pack14-3.png",
    shortDescription: "Deye BOS-B-Pack14.3 (High-Voltage LiFePO4 51,2V 280Ah 14,3kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення BOS-B-Pack14.3 (High-Voltage LiFePO4 51,2V 280Ah 14,3kWh) бренду Deye з прайсу 27.04. BOS-B-Pack14.3 Deye (High-Voltage LiFePO4 51,2V 280Ah 14,3kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 14,3kWh, LiFePO4, 51,2V, 280Ah, HV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "14,3kWh",
      "LiFePO4",
      "51,2V",
      "280Ah",
      "HV"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "HV",
      "LiFePO4",
      "Очікується"
    ]
  },
  {
    slug: "deye-se-f5-pro-deye-lifepo4-51-2v-100ah-5-12kwh",
    title: "SE-F5 Pro Deye (LiFePO4 51,2V 100Ah 5,12kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/se-f5-pro-deye.png",
    shortDescription: "Deye SE-F5 Pro (LiFePO4 51,2V 100Ah 5,12kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення SE-F5 Pro (LiFePO4 51,2V 100Ah 5,12kWh) бренду Deye з прайсу 27.04. SE-F5 Pro Deye (LiFePO4 51,2V 100Ah 5,12kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5,12kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5,12kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "LiFePO4",
      "Очікується"
    ]
  },
  {
    slug: "deye-se-f12-l-deye-lifepo4-51-2v-230ah-11-8-kwh",
    title: "SE-F12-L Deye (LiFePO4 51,2V 230Ah 11.8 kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/se-f12-l-deye.png",
    shortDescription: "Deye SE-F12-L (LiFePO4 51,2V 230Ah 11.8 kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення SE-F12-L (LiFePO4 51,2V 230Ah 11.8 kWh) бренду Deye з прайсу 27.04. SE-F12-L Deye (LiFePO4 51,2V 230Ah 11.8 kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 11.8 kWh, LiFePO4, 51,2V, 230Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "11.8 kWh",
      "LiFePO4",
      "51,2V",
      "230Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-se-f12-с-deye-lifepo4-51-2v-230ah-11-8-kwh",
    title: "SE-F12-С Deye (LiFePO4 51,2V 230Ah 11.8 kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/se-f12-s-deye.png",
    shortDescription: "Deye SE-F12-С (LiFePO4 51,2V 230Ah 11.8 kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення SE-F12-С (LiFePO4 51,2V 230Ah 11.8 kWh) бренду Deye з прайсу 27.04. SE-F12-С Deye (LiFePO4 51,2V 230Ah 11.8 kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 11.8 kWh, LiFePO4, 51,2V, 230Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "11.8 kWh",
      "LiFePO4",
      "51,2V",
      "230Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-se-f16-с-deye-lifepo4-51-2v-314ah-16-0-kwh",
    title: "SE-F16-С Deye (LiFePO4 51,2V 314Ah 16.0 kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/se-f16-s-deye.png",
    shortDescription: "Deye SE-F16-С (LiFePO4 51,2V 314Ah 16.0 kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення SE-F16-С (LiFePO4 51,2V 314Ah 16.0 kWh) бренду Deye з прайсу 27.04. SE-F16-С Deye (LiFePO4 51,2V 314Ah 16.0 kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 16.0 kWh, LiFePO4, 51,2V, 314Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "16.0 kWh",
      "LiFePO4",
      "51,2V",
      "314Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-se-f16-plus-l-deye-lifepo4-51-2v-314ah-16-0-kwh",
    title: "SE-F16 Plus-L Deye (LiFePO4 51,2V 314Ah 16.0 kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/se-f16-plus-l-deye.png",
    shortDescription: "Deye SE-F16 Plus-L (LiFePO4 51,2V 314Ah 16.0 kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення SE-F16 Plus-L (LiFePO4 51,2V 314Ah 16.0 kWh) бренду Deye з прайсу 27.04. SE-F16 Plus-L Deye (LiFePO4 51,2V 314Ah 16.0 kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 16.0 kWh, LiFePO4, 51,2V, 314Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "16.0 kWh",
      "LiFePO4",
      "51,2V",
      "314Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-bos-b-pack14-3-deye-high-voltage-lifepo4-51-2v-280ah-14-3kwh-2",
    title: "BOS-B-Pack14.3 Deye (High-Voltage LiFePO4 51,2V 280Ah 14,3kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-b-pack14-3-2.png",
    shortDescription: "Deye BOS-B-Pack14.3 (High-Voltage LiFePO4 51,2V 280Ah 14,3kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення BOS-B-Pack14.3 (High-Voltage LiFePO4 51,2V 280Ah 14,3kWh) бренду Deye з прайсу 27.04. BOS-B-Pack14.3 Deye (High-Voltage LiFePO4 51,2V 280Ah 14,3kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 14,3kWh, LiFePO4, 51,2V, 280Ah, HV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "14,3kWh",
      "LiFePO4",
      "51,2V",
      "280Ah",
      "HV"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "HV",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-bos-b-pack16-а3-deye-high-voltage-lifepo4-51-2v-314ah-16-08kwh",
    title: "BOS-B-Pack16-А3 Deye (High-Voltage LiFePO4 51,2V 314Ah 16.08kWh)",
    category: "Акумулятори",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-b-pack16-a3.png",
    shortDescription: "Deye BOS-B-Pack16-А3 (High-Voltage LiFePO4 51,2V 314Ah 16.08kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення BOS-B-Pack16-А3 (High-Voltage LiFePO4 51,2V 314Ah 16.08kWh) бренду Deye з прайсу 27.04. BOS-B-Pack16-А3 Deye (High-Voltage LiFePO4 51,2V 314Ah 16.08kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 16.08kWh, LiFePO4, 51,2V, 314Ah, HV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "16.08kWh",
      "LiFePO4",
      "51,2V",
      "314Ah",
      "HV"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "HV",
      "LiFePO4"
    ]
  },
  {
    slug: "deye-комплект-акумуляторна-батарея-модуль-al-w5-1-b-module-deye-lifepo4-51-2v-100ah-5-",
    title: "Комплект: Акумуляторна батарея модуль Al-W5.1-B Module Deye (LiFePO4 51,2V 100Ah 5,12kWh) - 2 шт + AI-W5.1-PDU1 Base Box+Base Deye- 1шт",
    category: "Системи зберігання",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/s51100-expand-dyness-stack100-s51100.png",
    shortDescription: "Deye Комплект: Акумуляторна батарея модуль Al-W5.1-B Module (LiFePO4 51,2V 100Ah 5,12kWh) - 2 шт + AI-W5.1-PDU1 Base Box+Base - 1шт: готове рішення для зберігання та керування енергією.",
    description: "Система Комплект: Акумуляторна батарея модуль Al-W5.1-B Module (LiFePO4 51,2V 100Ah 5,12kWh) - 2 шт + AI-W5.1-PDU1 Base Box+Base - 1шт бренду Deye з прайсу 27.04. Комплект: Акумуляторна батарея модуль Al-W5.1-B Module Deye (LiFePO4 51,2V 100Ah 5,12kWh) - 2 шт + AI-W5.1-PDU1 Base Box+Base Deye- 1шт Підходить для резерву, автономності та керування навантаженнями. Ключові характеристики: 5,12kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5,12kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Очікується"
    ]
  },
  {
    slug: "deye-система-зберігання-енергії-rw-f5-3-2h3-deye-3-6-kw-lifepo4-51-2v-100ah-5-32kwh",
    title: "Система зберігання енергії RW-F5.3-2H3 Deye (3,6 kW / LiFePO4 51,2V 100Ah 5,32kWh)",
    category: "Системи зберігання",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/rw-f5-3-2h3.png",
    shortDescription: "Deye Система зберігання енергії RW-F5.3-2H3 (3,6 kW / LiFePO4 51,2V 100Ah 5,32kWh): готове рішення для зберігання та керування енергією.",
    description: "Система Система зберігання енергії RW-F5.3-2H3 (3,6 kW / LiFePO4 51,2V 100Ah 5,32kWh) бренду Deye з прайсу 27.04. Система зберігання енергії RW-F5.3-2H3 Deye (3,6 kW / LiFePO4 51,2V 100Ah 5,32kWh) Підходить для резерву, автономності та керування навантаженнями. Ключові характеристики: 3,6 kW, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "3,6 kW",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Очікується"
    ]
  },
  {
    slug: "deye-гібридний-інвертор-ai-w5-1-8k-sg01lp1-eu-deye-ess-8-kw-1-фаза",
    title: "Гібридний інвертор AI-W5.1-8K-SG01LP1-EU Deye ESS (8 kW, 1 фаза)",
    category: "Системи зберігання",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/ai-w5-1-8k-sg01lp1-eu.png",
    shortDescription: "Deye Гібридний інвертор AI-W5.1-8K-SG01LP1-EU ESS (8 kW, 1 фаза): готове рішення для зберігання та керування енергією.",
    description: "Система Гібридний інвертор AI-W5.1-8K-SG01LP1-EU ESS (8 kW, 1 фаза) бренду Deye з прайсу 27.04. Гібридний інвертор AI-W5.1-8K-SG01LP1-EU Deye ESS (8 kW, 1 фаза) Підходить для резерву, автономності та керування навантаженнями. Ключові характеристики: 8 kW. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "8 kW"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Очікується"
    ]
  },
  {
    slug: "deye-гібридний-інвертор-ai-w5-1-12k-sg04lpp3-eu-deye-ess-12-kw-3-фаза",
    title: "Гібридний інвертор AI-W5.1-12K-SG04LPP3-EU Deye ESS (12 kW, 3 фаза)",
    category: "Системи зберігання",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/ai-w5-1-12k-sg04lpp3-eu.png",
    shortDescription: "Deye Гібридний інвертор AI-W5.1-12K-SG04LPP3-EU ESS (12 kW, 3 фаза): готове рішення для зберігання та керування енергією.",
    description: "Система Гібридний інвертор AI-W5.1-12K-SG04LPP3-EU ESS (12 kW, 3 фаза) бренду Deye з прайсу 27.04. Гібридний інвертор AI-W5.1-12K-SG04LPP3-EU Deye ESS (12 kW, 3 фаза) Підходить для резерву, автономності та керування навантаженнями. Ключові характеристики: 12 kW. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "12 kW"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Очікується"
    ]
  },
  {
    slug: "deye-iнтерфейс-підключення-до-інвертора-база-ai-w5-1-pdu3-b-base-deye",
    title: "Iнтерфейс підключення до інвертора+база AI-W5.1-PDU3-B+BASE Deye",
    category: "Системи зберігання",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/ai-w5-1-pdu3-b-base-deye.png",
    shortDescription: "Deye Iнтерфейс підключення до інвертора+база AI-W5.1-PDU3-B+BASE: готове рішення для зберігання та керування енергією.",
    description: "Система Iнтерфейс підключення до інвертора+база AI-W5.1-PDU3-B+BASE бренду Deye з прайсу 27.04. Iнтерфейс підключення до інвертора+база AI-W5.1-PDU3-B+BASE Deye Підходить для резерву, автономності та керування навантаженнями. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [],
    badges: [
      "Під замовлення",
      "Deye",
      "Очікується"
    ]
  },
  {
    slug: "deye-акумуляторна-батарея-модуль-al-w5-1-b-module-deye-lifepo4-51-2v-100ah-5-12kwh",
    title: "Акумуляторна батарея модуль Al-W5.1-B Module Deye (LiFePO4 51,2V 100Ah 5,12kWh)",
    category: "Системи зберігання",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/al-w5-1-b-module-deye.png",
    shortDescription: "Deye Акумуляторна батарея модуль Al-W5.1-B Module (LiFePO4 51,2V 100Ah 5,12kWh): готове рішення для зберігання та керування енергією.",
    description: "Система Акумуляторна батарея модуль Al-W5.1-B Module (LiFePO4 51,2V 100Ah 5,12kWh) бренду Deye з прайсу 27.04. Акумуляторна батарея модуль Al-W5.1-B Module Deye (LiFePO4 51,2V 100Ah 5,12kWh) Підходить для резерву, автономності та керування навантаженнями. Ключові характеристики: 5,12kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5,12kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "Очікується"
    ]
  },
  {
    slug: "deye-ai-w5-1-pdu1-base-box-base-deye",
    title: "AI-W5.1-PDU1 Base Box+Base Deye",
    category: "Системи зберігання",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/ai-w5-1-pdu1-base-box-base-deye.png",
    shortDescription: "Deye AI-W5.1-PDU1 Base Box+Base: готове рішення для зберігання та керування енергією.",
    description: "Система AI-W5.1-PDU1 Base Box+Base бренду Deye з прайсу 27.04. AI-W5.1-PDU1 Base Box+Base Deye Підходить для резерву, автономності та керування навантаженнями. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [],
    badges: [
      "Під замовлення",
      "Deye",
      "Очікується"
    ]
  },
  {
    slug: "deye-стандартна-стійка-19-дюймів-12-шт-3u-hrack-deye",
    title: "Стандартна стійка 19 дюймів, (12 шт.) 3U-HRACK Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/standartna-stiyka-19-dyuymiv-12-sht-3u-hrack-deye.png",
    shortDescription: "Deye Стандартна стійка 19 дюймів, (12 шт.) 3U-HRACK: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Стандартна стійка 19 дюймів, (12 шт.) 3U-HRACK бренду Deye з прайсу 27.04. Стандартна стійка 19 дюймів, (12 шт.) 3U-HRACK Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-3u-lpcable-deye",
    title: "3U-LPCable Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/3u-lpcable-deye-new.png",
    shortDescription: "Deye 3U-LPCable: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція 3U-LPCable бренду Deye з прайсу 27.04. 3U-LPCable Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-стандартна-стійка-19-дюймів-8-шт-3u-lrack-deye",
    title: "Стандартна стійка 19 дюймів, (8 шт.) 3U-LRACK Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/standartna-stiyka-19-dyuymiv-8-sht-3u-lrack-deye.png",
    shortDescription: "Deye Стандартна стійка 19 дюймів, (8 шт.) 3U-LRACK: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Стандартна стійка 19 дюймів, (8 шт.) 3U-LRACK бренду Deye з прайсу 27.04. Стандартна стійка 19 дюймів, (8 шт.) 3U-LRACK Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-bos-a-pdu-2-deye-high-voltage-control-box",
    title: "BOS-A-PDU-2 Deye High Voltage control box",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-a-pdu-2-deye-high-voltage-control-box.png",
    shortDescription: "Deye BOS-A-PDU-2 High Voltage control box: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція BOS-A-PDU-2 High Voltage control box бренду Deye з прайсу 27.04. BOS-A-PDU-2 Deye High Voltage control box Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "HV",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-стандартна-стійка-11-шт-bos-a-rack11-deye",
    title: "Стандартна стійка (11 шт.) BOS-A-Rack11 Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-a-rack11-deye.png",
    shortDescription: "Deye Стандартна стійка (11 шт.) BOS-A-Rack11: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Стандартна стійка (11 шт.) BOS-A-Rack11 бренду Deye з прайсу 27.04. Стандартна стійка (11 шт.) BOS-A-Rack11 Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-bos-a-rack14-deye-14-шт",
    title: "BOS-A-Rack14 Deye (14 шт.)",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-a-rack14-deye.png",
    shortDescription: "Deye BOS-A-Rack14 (14 шт.): комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція BOS-A-Rack14 (14 шт.) бренду Deye з прайсу 27.04. BOS-A-Rack14 Deye (14 шт.) Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-bos-b-pdu-2-deye-high-voltage-control-box",
    title: "BOS-B-PDU-2 Deye High Voltage control box",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-b-pdu-2-deye-high-voltage-control-box.png",
    shortDescription: "Deye BOS-B-PDU-2 High Voltage control box: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція BOS-B-PDU-2 High Voltage control box бренду Deye з прайсу 27.04. BOS-B-PDU-2 Deye High Voltage control box Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "HV",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-bos-g-pdu2-deye-high-voltage-control-box",
    title: "BOS-G-PDU2 Deye High Voltage control box",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/bos-g-pdu2-deye-high-voltage-control-box.png",
    shortDescription: "Deye BOS-G-PDU2 High Voltage control box: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція BOS-G-PDU2 High Voltage control box бренду Deye з прайсу 27.04. BOS-G-PDU2 Deye High Voltage control box Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Під замовлення",
      "Deye",
      "HV",
      "Комплектуючі",
      "Очікується"
    ]
  },
  {
    slug: "deye-каб-живл-encable5-0-deye-5-метрів-негативний-полюс-зовнішнього-pcs",
    title: "Каб.живл. ENCable5.0 Deye (5 метрів негативний полюс зовнішнього PCS)",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/encable5-0-deye.png",
    shortDescription: "Deye Каб.живл. ENCable5.0 (5 метрів негативний полюс зовнішнього PCS): комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Каб.живл. ENCable5.0 (5 метрів негативний полюс зовнішнього PCS) бренду Deye з прайсу 27.04. Каб.живл. ENCable5.0 Deye (5 метрів негативний полюс зовнішнього PCS) Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-каб-живл-epcable5-0-deye-5-метрів-позитивний-полюс-зовнішнього-pcs",
    title: "Каб. живл. EPCable5.0 Deye (5 метрів позитивний полюс зовнішнього PCS)",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/encable5-0-deye.png",
    shortDescription: "Deye Каб. живл. EPCable5.0 (5 метрів позитивний полюс зовнішнього PCS): комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Каб. живл. EPCable5.0 (5 метрів позитивний полюс зовнішнього PCS) бренду Deye з прайсу 27.04. Каб. живл. EPCable5.0 Deye (5 метрів позитивний полюс зовнішнього PCS) Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-epwrcable5-0-deye",
    title: "EPWRCable5.0 Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/kbe-solar-cable-6mm-black.png",
    shortDescription: "Deye EPWRCable5.0: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція EPWRCable5.0 бренду Deye з прайсу 27.04. EPWRCable5.0 Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-блок-керування-кластером-високовольтної-батареї-hvb750v-100a-eu-deye",
    title: "Блок керування кластером високовольтної батареї HVB750V 100A-EU Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/hvb750v-100a-eu-deye.png",
    shortDescription: "Deye Блок керування кластером високовольтної батареї HVB750V 100A-EU: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Блок керування кластером високовольтної батареї HVB750V 100A-EU бренду Deye з прайсу 27.04. Блок керування кластером високовольтної батареї HVB750V 100A-EU Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Немає в наявності",
      "Deye",
      "HV",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-battery-brackets-кронштейн-укладання-1-шт-включаючи-4-кронштейни",
    title: "Deye Battery Brackets (Кронштейн укладання) 1 шт. включаючи 4 кронштейни,",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/deye-battery-brackets.png",
    shortDescription: "Deye Battery Brackets (Кронштейн укладання) 1 шт. включаючи 4 кронштейни,: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Battery Brackets (Кронштейн укладання) 1 шт. включаючи 4 кронштейни, бренду Deye з прайсу 27.04. Battery Brackets (Кронштейн укладання) 1 шт. включаючи 4 кронштейни, Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-модуль-моніторингу-lse-3-deye",
    title: "Модуль моніторингу LSE-3 Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lse-3-deye.png",
    shortDescription: "Deye Модуль моніторингу LSE-3: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Модуль моніторингу LSE-3 бренду Deye з прайсу 27.04. Модуль моніторингу LSE-3 Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-фотоелектричний-розумний-оптимізатор-sun-xl02-b-deye",
    title: "Фотоелектричний розумний оптимізатор SUN-XL02-B Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sun-xl02-b-deye.png",
    shortDescription: "Deye Фотоелектричний розумний оптимізатор SUN-XL02-B: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Фотоелектричний розумний оптимізатор SUN-XL02-B бренду Deye з прайсу 27.04. Фотоелектричний розумний оптимізатор SUN-XL02-B Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-кабелі-для-комутації-акумуляторних-батарей-rw-m6-1-bcable-deye",
    title: "Кабелі для комутації акумуляторних батарей RW-M6.1-Bcable Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/rw-m6-1-bcable-deye.png",
    shortDescription: "Deye Кабелі для комутації акумуляторних батарей RW-M6.1-Bcable: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Кабелі для комутації акумуляторних батарей RW-M6.1-Bcable бренду Deye з прайсу 27.04. Кабелі для комутації акумуляторних батарей RW-M6.1-Bcable Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "deye-кабелі-для-комутації-акумуляторних-батарей-3u-lpcable-deye",
    title: "Кабелі для комутації акумуляторних батарей 3U-LPCable Deye",
    category: "Комплектуючі",
    brand: "Deye",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/3u-lpcable-deye-new.png",
    shortDescription: "Deye Кабелі для комутації акумуляторних батарей 3U-LPCable: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Кабелі для комутації акумуляторних батарей 3U-LPCable бренду Deye з прайсу 27.04. Кабелі для комутації акумуляторних батарей 3U-LPCable Deye Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Deye",
      "Комплектуючі"
    ]
  },
  {
    slug: "felicity-wi-fi-module-smart-dtu-felicity-ivem3024-lv-3квт-та-ivem5048-lv-5квт",
    title: "WI-FI module Smart DTU Felicity IVEM3024-LV 3кВт та IVEM5048-LV 5кВт",
    category: "Комплектуючі",
    brand: "Felicity",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/wi-fi-module-smart-dtu-felicity-ivem3024-lv-ivem5048-lv.png",
    shortDescription: "Felicity WI-FI module Smart DTU IVEM3024-LV 3кВт та IVEM5048-LV 5кВт: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція WI-FI module Smart DTU IVEM3024-LV 3кВт та IVEM5048-LV 5кВт бренду Felicity з прайсу 27.04. WI-FI module Smart DTU Felicity IVEM3024-LV 3кВт та IVEM5048-LV 5кВт Ключові характеристики: LV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "LV"
    ],
    badges: [
      "Є в наявності",
      "Felicity",
      "LV",
      "Комплектуючі"
    ]
  },
  {
    slug: "felicity-t-rex-5klp1g01-felicity-5-kw-1-фаза-2-mmpt",
    title: "T-REX-5KLP1G01 Felicity (5 kW, 1 фаза, 2 MMPT)",
    category: "Інвертори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/t-rex-5klp1g01-felicity.png",
    shortDescription: "Felicity T-REX-5KLP1G01 (5 kW, 1 фаза, 2 MMPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель T-REX-5KLP1G01 (5 kW, 1 фаза, 2 MMPT) бренду Felicity з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». T-REX-5KLP1G01 Felicity (5 kW, 1 фаза, 2 MMPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 5 kW. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5 kW"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "Гібридний"
    ]
  },
  {
    slug: "felicity-t-rex-50khp3g01-felicity-50-kw-3-фази-4-mppt-hv",
    title: "T-REX-50KHP3G01 Felicity (50 kW, 3 фази, 4 MPPT, HV)",
    category: "Інвертори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/t-rex-50khp3g01-felicity.png",
    shortDescription: "Felicity T-REX-50KHP3G01 (50 kW, 3 фази, 4 MPPT, HV): інвертор для сонячних та резервних енергосистем.",
    description: "Модель T-REX-50KHP3G01 (50 kW, 3 фази, 4 MPPT, HV) бренду Felicity з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ». T-REX-50KHP3G01 Felicity (50 kW, 3 фази, 4 MPPT, HV) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 50 kW, 4 MPPT, HV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "50 kW",
      "4 MPPT",
      "HV"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "Гібридний",
      "HV"
    ]
  },
  {
    slug: "felicity-ivem3024-lv-felicity-3-kw-1-фаза-1-mppt",
    title: "IVEM3024-LV Felicity (3 kW, 1 фаза, 1 MPPT)",
    category: "Інвертори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/ivem3024-lv-felicity.png",
    shortDescription: "Felicity IVEM3024-LV (3 kW, 1 фаза, 1 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель IVEM3024-LV (3 kW, 1 фаза, 1 MPPT) бренду Felicity з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ АВТОНОМНІ». IVEM3024-LV Felicity (3 kW, 1 фаза, 1 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 3 kW, 1 MPPT, LV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "3 kW",
      "1 MPPT",
      "LV"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "Гібридний",
      "Автономний",
      "LV"
    ]
  },
  {
    slug: "felicity-ivem5048-lv-felicity-5-kw-1-фаза-1-mppt",
    title: "IVEM5048-LV Felicity (5 kW, 1 фаза, 1 MPPT)",
    category: "Інвертори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/ivem5048-lv-felicity.png",
    shortDescription: "Felicity IVEM5048-LV (5 kW, 1 фаза, 1 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель IVEM5048-LV (5 kW, 1 фаза, 1 MPPT) бренду Felicity з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ АВТОНОМНІ». IVEM5048-LV Felicity (5 kW, 1 фаза, 1 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 5 kW, 1 MPPT, LV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5 kW",
      "1 MPPT",
      "LV"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "Гібридний",
      "Автономний",
      "LV"
    ]
  },
  {
    slug: "felicity-ivem8048-lv-felicity-8-kw-1-фаза-2-mppt",
    title: "IVEM8048-LV Felicity (8 kW, 1 фаза, 2 MPPT)",
    category: "Інвертори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/ivem8048-lv-felicity.png",
    shortDescription: "Felicity IVEM8048-LV (8 kW, 1 фаза, 2 MPPT): інвертор для сонячних та резервних енергосистем.",
    description: "Модель IVEM8048-LV (8 kW, 1 фаза, 2 MPPT) бренду Felicity з прайсу 27.04, розділ «ІНВЕРТОРИ ГІБРИДНІ АВТОНОМНІ». IVEM8048-LV Felicity (8 kW, 1 фаза, 2 MPPT) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 8 kW, 2 MPPT, LV. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "8 kW",
      "2 MPPT",
      "LV"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "Гібридний",
      "Автономний",
      "LV"
    ]
  },
  {
    slug: "felicity-високовольтна-lux-y-48100hmg01-felicity-lifepo4-51-2v-100ah-5-12kwh",
    title: "Високовольтна LUX-Y-48100HMG01 Felicity (LiFePO4 51,2V 100Ah 5.12kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lux-y-48100hmg01-felicity.png",
    shortDescription: "Felicity Високовольтна LUX-Y-48100HMG01 (LiFePO4 51,2V 100Ah 5.12kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення Високовольтна LUX-Y-48100HMG01 (LiFePO4 51,2V 100Ah 5.12kWh) бренду Felicity з прайсу 27.04. Високовольтна LUX-Y-48100HMG01 Felicity (LiFePO4 51,2V 100Ah 5.12kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5.12kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5.12kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "LiFePO4"
    ]
  },
  {
    slug: "felicity-lux-x-48100lmg01-felicity-lifepo4-51-2v-100ah-5kwh",
    title: "LUX-X-48100LMG01 Felicity (LiFePO4 51,2V 100Ah 5kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lux-x-48100lmg01-felicity.png",
    shortDescription: "Felicity LUX-X-48100LMG01 (LiFePO4 51,2V 100Ah 5kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LUX-X-48100LMG01 (LiFePO4 51,2V 100Ah 5kWh) бренду Felicity з прайсу 27.04. LUX-X-48100LMG01 Felicity (LiFePO4 51,2V 100Ah 5kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "LiFePO4"
    ]
  },
  {
    slug: "felicity-lux-e-48100lg03-felicity-lifepo4-51-2v-100ah-5kwh",
    title: "LUX-E-48100LG03 Felicity (LiFePO4 51,2V 100Ah 5kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lux-e-48100lg03-felicity.png",
    shortDescription: "Felicity LUX-E-48100LG03 (LiFePO4 51,2V 100Ah 5kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LUX-E-48100LG03 (LiFePO4 51,2V 100Ah 5kWh) бренду Felicity з прайсу 27.04. LUX-E-48100LG03 Felicity (LiFePO4 51,2V 100Ah 5kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "LiFePO4"
    ]
  },
  {
    slug: "felicity-lux-x-48100lcg01-felicity-lifepo4-51-2v-100ah-5kwh",
    title: "LUX-X-48100LCG01 Felicity (LiFePO4 51,2V 100Ah 5kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lux-x-48100lcg01-felicity.png",
    shortDescription: "Felicity LUX-X-48100LCG01 (LiFePO4 51,2V 100Ah 5kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LUX-X-48100LCG01 (LiFePO4 51,2V 100Ah 5kWh) бренду Felicity з прайсу 27.04. LUX-X-48100LCG01 Felicity (LiFePO4 51,2V 100Ah 5kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "LiFePO4"
    ]
  },
  {
    slug: "felicity-lux-x-48100lmg01-felicity-lifepo4-51-2v-100ah-5kwh-2",
    title: "LUX-X-48100LMG01 Felicity (LiFePO4 51,2V 100Ah 5kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lux-x-48100lmg01-felicity.png",
    shortDescription: "Felicity LUX-X-48100LMG01 (LiFePO4 51,2V 100Ah 5kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LUX-X-48100LMG01 (LiFePO4 51,2V 100Ah 5kWh) бренду Felicity з прайсу 27.04. LUX-X-48100LMG01 Felicity (LiFePO4 51,2V 100Ah 5kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5kWh, LiFePO4, 51,2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5kWh",
      "LiFePO4",
      "51,2V",
      "100Ah"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "LiFePO4"
    ]
  },
  {
    slug: "felicity-lux-e-48200lg03-felicity-lifepo4-51-2v-205ah-10-5kwh",
    title: "LUX-E-48200LG03 Felicity (LiFePO4 51,2V 205Ah 10,5kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lux-e-48200lg03-felicity.png",
    shortDescription: "Felicity LUX-E-48200LG03 (LiFePO4 51,2V 205Ah 10,5kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LUX-E-48200LG03 (LiFePO4 51,2V 205Ah 10,5kWh) бренду Felicity з прайсу 27.04. LUX-E-48200LG03 Felicity (LiFePO4 51,2V 205Ah 10,5kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 10,5kWh, LiFePO4, 51,2V, 205Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "10,5kWh",
      "LiFePO4",
      "51,2V",
      "205Ah"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "LiFePO4"
    ]
  },
  {
    slug: "felicity-lux-e-48250lg03-felicity-lifepo4-51-2v-250ah-12-5kwh",
    title: "LUX-E-48250LG03 Felicity (LiFePO4 51,2V 250Ah 12,5kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lux-e-48250lg03-felicity.png",
    shortDescription: "Felicity LUX-E-48250LG03 (LiFePO4 51,2V 250Ah 12,5kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LUX-E-48250LG03 (LiFePO4 51,2V 250Ah 12,5kWh) бренду Felicity з прайсу 27.04. LUX-E-48250LG03 Felicity (LiFePO4 51,2V 250Ah 12,5kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 12,5kWh, LiFePO4, 51,2V, 250Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "12,5kWh",
      "LiFePO4",
      "51,2V",
      "250Ah"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "LiFePO4"
    ]
  },
  {
    slug: "felicity-lpbf48300-felicity-lifepo4-51-2v-300ah-15kwh",
    title: "LPBF48300 Felicity (LiFePO4 51,2V 300Ah 15kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lpbf48300-felicity.png",
    shortDescription: "Felicity LPBF48300 (LiFePO4 51,2V 300Ah 15kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LPBF48300 (LiFePO4 51,2V 300Ah 15kWh) бренду Felicity з прайсу 27.04. LPBF48300 Felicity (LiFePO4 51,2V 300Ah 15kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 15kWh, LiFePO4, 51,2V, 300Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "15kWh",
      "LiFePO4",
      "51,2V",
      "300Ah"
    ],
    badges: [
      "Під замовлення",
      "Felicity",
      "LiFePO4",
      "Очікується"
    ]
  },
  {
    slug: "felicity-lux-e-48250lg03-felicity-lifepo4-51-2v-250ah-12-5kwh-2",
    title: "LUX-E-48250LG03 Felicity (LiFePO4 51,2V 250Ah 12,5kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lux-e-48250lg03-felicity.png",
    shortDescription: "Felicity LUX-E-48250LG03 (LiFePO4 51,2V 250Ah 12,5kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LUX-E-48250LG03 (LiFePO4 51,2V 250Ah 12,5kWh) бренду Felicity з прайсу 27.04. LUX-E-48250LG03 Felicity (LiFePO4 51,2V 250Ah 12,5kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 12,5kWh, LiFePO4, 51,2V, 250Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "12,5kWh",
      "LiFePO4",
      "51,2V",
      "250Ah"
    ],
    badges: [
      "Немає в наявності",
      "Felicity",
      "LiFePO4"
    ]
  },
  {
    slug: "felicity-lpbf48300-felicity-lifepo4-51-2v-300ah-15kwh-2",
    title: "LPBF48300 Felicity (LiFePO4 51,2V 300Ah 15kWh)",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lpbf48300-felicity.png",
    shortDescription: "Felicity LPBF48300 (LiFePO4 51,2V 300Ah 15kWh): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LPBF48300 (LiFePO4 51,2V 300Ah 15kWh) бренду Felicity з прайсу 27.04. LPBF48300 Felicity (LiFePO4 51,2V 300Ah 15kWh) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 15kWh, LiFePO4, 51,2V, 300Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "15kWh",
      "LiFePO4",
      "51,2V",
      "300Ah"
    ],
    badges: [
      "Під замовлення",
      "Felicity",
      "LiFePO4",
      "Очікується"
    ]
  },
  {
    slug: "felicity-flh48100ucg1",
    title: "Felicity FLH48100UCG1",
    category: "Акумулятори",
    brand: "Felicity",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/felicity-flh48100ucg1.png",
    shortDescription: "Felicity FLH48100UCG1: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення FLH48100UCG1 бренду Felicity з прайсу 27.04. FLH48100UCG1 Підходить для резервного живлення, автономності та масштабування енергосистеми. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [],
    badges: [
      "Під замовлення",
      "Felicity",
      "LiFePO4",
      "Очікується"
    ]
  },
  {
    slug: "dyness-акумуляторна-батарея-s51100-dyness-stack-lifepo4-51-2v-100ah-5-12kwh",
    title: "Акумуляторна батарея S51100 Dyness (STACK LiFePO4 51.2V 100Ah 5.12kWh)",
    category: "Системи зберігання",
    brand: "Dyness",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/s51100-dyness-stack-lifepo4-51-2v-100ah-5-12kwh.png",
    shortDescription: "Dyness Акумуляторна батарея S51100 (STACK LiFePO4 51.2V 100Ah 5.12kWh): готове рішення для зберігання та керування енергією.",
    description: "Система Акумуляторна батарея S51100 (STACK LiFePO4 51.2V 100Ah 5.12kWh) бренду Dyness з прайсу 27.04. Акумуляторна батарея S51100 Dyness (STACK LiFePO4 51.2V 100Ah 5.12kWh) Підходить для резерву, автономності та керування навантаженнями. Ключові характеристики: 5.12kWh, LiFePO4, 51.2V, 100Ah. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5.12kWh",
      "LiFePO4",
      "51.2V",
      "100Ah"
    ],
    badges: [
      "Під замовлення",
      "Dyness",
      "Очікується"
    ]
  },
  {
    slug: "dyness-модуль-управління-sbdu100-bms-dyness-для-s51100",
    title: "Модуль управління SBDU100 BMS Dyness для S51100",
    category: "Системи зберігання",
    brand: "Dyness",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/sbdu100-bms-dyness-s51100.png",
    shortDescription: "Dyness Модуль управління SBDU100 BMS для S51100: готове рішення для зберігання та керування енергією.",
    description: "Система Модуль управління SBDU100 BMS для S51100 бренду Dyness з прайсу 27.04. Модуль управління SBDU100 BMS Dyness для S51100 Підходить для резерву, автономності та керування навантаженнями. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [],
    badges: [
      "Під замовлення",
      "Dyness",
      "Очікується"
    ]
  },
  {
    slug: "dyness-s51100-expand-комплект-розширення-для-модульних-акумуляторних-батарей-dyness-st",
    title: "S51100 Expand (Комплект розширення для модульних акумуляторних батарей Dyness Stack100 S51100)",
    category: "Системи зберігання",
    brand: "Dyness",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/kbe-solar-cable-6mm-red.png",
    shortDescription: "Dyness S51100 Expand (Комплект розширення для модульних акумуляторних батарей Stack100 S51100): готове рішення для зберігання та керування енергією.",
    description: "Система S51100 Expand (Комплект розширення для модульних акумуляторних батарей Stack100 S51100) бренду Dyness з прайсу 27.04. S51100 Expand (Комплект розширення для модульних акумуляторних батарей Dyness Stack100 S51100) Підходить для резерву, автономності та керування навантаженнями. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [],
    badges: [
      "Під замовлення",
      "Dyness",
      "Очікується"
    ]
  },
  {
    slug: "kbe-kbe-solar-db-6-00-q-black-sw-verz-en-50618-iec-62930-2-pfg-1169-10-19",
    title: "KBE Соларний кабель КВЕ 6мм чорний (Німеччина)",
    category: "Комплектуючі",
    brand: "KBE",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "KBE Соларний кабель КВЕ 6мм чорний (Німеччина): комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Соларний кабель КВЕ 6мм чорний (Німеччина) бренду KBE з оновленого прайсу 01.05.2026. Соларний кабель КВЕ 6мм чорний (Німеччина) Ключові характеристики: Чорний. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Чорний"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "kbe-kbe-solar-db-6-00-q-red-rt-verz-en-50618-iec-62930-2-pfg-1169-10-19",
    title: "KBE Соларний кабель КВЕ 6мм червоний (Німеччина)",
    category: "Комплектуючі",
    brand: "KBE",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "KBE Соларний кабель КВЕ 6мм червоний (Німеччина): комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Соларний кабель КВЕ 6мм червоний (Німеччина) бренду KBE з оновленого прайсу 01.05.2026. Соларний кабель КВЕ 6мм червоний (Німеччина) Ключові характеристики: Червоний. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Червоний"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "canadian-solar-canadian-solar-cs6w-585w-t",
    title: "Canadian Solar CS6W-(585W)T",
    category: "Сонячні панелі",
    brand: "Canadian Solar",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "Canadian Solar CS6W-(585W)T: сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель CS6W-(585W)T бренду Canadian Solar з прайсу 27.04. Canadian Solar CS6W-(585W)T Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 585 Вт, 585W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "585 Вт",
      "585W"
    ],
    badges: [
      "Є в наявності",
      "Canadian Solar",
      "Сонячна панель"
    ]
  },
  {
    slug: "dah-solar-dhn-54x16-fs-bb-435w-dah-solar",
    title: "DHN-54X16/FS(BB)-(435W) DAH Solar",
    category: "Сонячні панелі",
    brand: "DAH Solar",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "DAH Solar DHN-54X16/FS(BB)-(435W): сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHN-54X16/FS(BB)-(435W) бренду DAH Solar з прайсу 27.04. DHN-54X16/FS(BB)-(435W) DAH Solar Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 435 Вт, 435W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "435 Вт",
      "435W"
    ],
    badges: [
      "Є в наявності",
      "DAH Solar",
      "Сонячна панель"
    ]
  },
  {
    slug: "dah-solar-dhn-60x16-dg-bb-480w-dah-solar",
    title: "DHN-60X16/DG(BB)-(480W) DAH Solar",
    category: "Сонячні панелі",
    brand: "DAH Solar",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "DAH Solar DHN-60X16/DG(BB)-(480W): сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHN-60X16/DG(BB)-(480W) бренду DAH Solar з прайсу 27.04. DHN-60X16/DG(BB)-(480W) DAH Solar Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 480 Вт, 480W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "480 Вт",
      "480W"
    ],
    badges: [
      "Під замовлення",
      "DAH Solar",
      "Сонячна панель",
      "Очікується"
    ]
  },
  {
    slug: "dah-solar-dhn-60r18-dg-bb-500w-dah-solar",
    title: "DHN-60R18/DG(BB)-(500W) DAH Solar",
    category: "Сонячні панелі",
    brand: "DAH Solar",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "DAH Solar DHN-60R18/DG(BB)-(500W): сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHN-60R18/DG(BB)-(500W) бренду DAH Solar з прайсу 27.04. DHN-60R18/DG(BB)-(500W) DAH Solar Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 500 Вт, 500W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "500 Вт",
      "500W"
    ],
    badges: [
      "Є в наявності",
      "DAH Solar",
      "Сонячна панель"
    ]
  },
  {
    slug: "dah-solar-dhn-72x16-dg-bw-585w-dah-solar",
    title: "DHN-72X16/DG(BW) (585W) DAH Solar",
    category: "Сонячні панелі",
    brand: "DAH Solar",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "DAH Solar DHN-72X16/DG(BW) (585W): сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHN-72X16/DG(BW) (585W) бренду DAH Solar з прайсу 27.04. DHN-72X16/DG(BW) (585W) DAH Solar Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 585 Вт, 585W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "585 Вт",
      "585W"
    ],
    badges: [
      "Під замовлення",
      "DAH Solar",
      "Сонячна панель",
      "Очікується"
    ]
  },
  {
    slug: "dah-solar-dhn-72r18-dg-610w-dah-solar",
    title: "DHN-72R18/DG-(610W) DAH Solar",
    category: "Сонячні панелі",
    brand: "DAH Solar",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "DAH Solar DHN-72R18/DG-(610W): сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHN-72R18/DG-(610W) бренду DAH Solar з прайсу 27.04. DHN-72R18/DG-(610W) DAH Solar Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 610 Вт, 610W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "610 Вт",
      "610W"
    ],
    badges: [
      "Під замовлення",
      "DAH Solar",
      "Сонячна панель",
      "Очікується"
    ]
  },
  {
    slug: "dah-solar-dhn-72r18-dg-615w-dah-solar",
    title: "DHN-72R18/DG-(615W) DAH Solar",
    category: "Сонячні панелі",
    brand: "DAH Solar",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "DAH Solar DHN-72R18/DG-(615W): сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHN-72R18/DG-(615W) бренду DAH Solar з прайсу 27.04. DHN-72R18/DG-(615W) DAH Solar Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 615 Вт, 615W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "615 Вт",
      "615W"
    ],
    badges: [
      "Під замовлення",
      "DAH Solar",
      "Сонячна панель",
      "Очікується"
    ]
  },
  {
    slug: "dah-solar-dhn-78x16-dg-630w-dah-solar",
    title: "DHN-78X16/DG-(630W) DAH Solar",
    category: "Сонячні панелі",
    brand: "DAH Solar",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "DAH Solar DHN-78X16/DG-(630W): сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHN-78X16/DG-(630W) бренду DAH Solar з прайсу 27.04. DHN-78X16/DG-(630W) DAH Solar Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 630 Вт, 630W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "630 Вт",
      "630W"
    ],
    badges: [
      "Немає в наявності",
      "DAH Solar",
      "Сонячна панель"
    ]
  },
  {
    slug: "dah-solar-dhn-66y18-dg-700w-dah-solar",
    title: "DHN-66Y18/DG-(700W) DAH Solar",
    category: "Сонячні панелі",
    brand: "DAH Solar",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "DAH Solar DHN-66Y18/DG-(700W): сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHN-66Y18/DG-(700W) бренду DAH Solar з прайсу 27.04. DHN-66Y18/DG-(700W) DAH Solar Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 700 Вт, 700W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "700 Вт",
      "700W"
    ],
    badges: [
      "Є в наявності",
      "DAH Solar",
      "Сонячна панель"
    ]
  },
  {
    slug: "solis-s6-eh1p6k-l-plus",
    title: "Solis S6-EH1P6K-L-PLUS",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh1p6k-l-plus.png",
    shortDescription: "Solis S6-EH1P6K-L-PLUS: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH1P6K-L-PLUS бренду Solis з оновленого прайсу 01.05.2026, розділ «Низковольтні Гібридні Solis». 6kWt 1Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 6kWt, 1 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "6kWt",
      "1 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Гібридний",
      "LV"
    ]
  },
  {
    slug: "solis-s6-eh1p8k02-nv-yd-l",
    title: "Solis S6-EH1P8K02-NV-YD-L",
    category: "Інвертори",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh1p8k02-nv-yd-l.png",
    shortDescription: "Solis S6-EH1P8K02-NV-YD-L: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH1P8K02-NV-YD-L бренду Solis з оновленого прайсу 01.05.2026, розділ «Низковольтні Гібридні Solis». 8kWt 1Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 8kWt, 1 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "8kWt",
      "1 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Гібридний",
      "LV"
    ]
  },
  {
    slug: "solis-s6-eh3p10k02-nv-yd-l",
    title: "Solis S6-EH3P10K02-NV-YD-L",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p10k02-nv-yd-l.png",
    shortDescription: "Solis S6-EH3P10K02-NV-YD-L: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P10K02-NV-YD-L бренду Solis з оновленого прайсу 01.05.2026, розділ «Низковольтні Гібридні Solis». 10kWt 3Ph hybrid inverter with DC, Wifi, CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 10kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "10kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Гібридний",
      "LV"
    ]
  },
  {
    slug: "solis-s6-eh3p12k02-nv-yd-l",
    title: "Solis S6-EH3P12K02-NV-YD-L",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p12k02-nv-yd-l.png",
    shortDescription: "Solis S6-EH3P12K02-NV-YD-L: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P12K02-NV-YD-L бренду Solis з оновленого прайсу 01.05.2026, розділ «Низковольтні Гібридні Solis». 12kWt 3Ph hybrid inverter with DC, Wifi, CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 12kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "12kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Гібридний",
      "LV"
    ]
  },
  {
    slug: "solis-s6-eh3p15k02-nv-yd-l",
    title: "Solis S6-EH3P15K02-NV-YD-L",
    category: "Інвертори",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p15k02-nv-yd-l.png",
    shortDescription: "Solis S6-EH3P15K02-NV-YD-L: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P15K02-NV-YD-L бренду Solis з оновленого прайсу 01.05.2026, розділ «Низковольтні Гібридні Solis». 15kWt 3Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 15kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "15kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Гібридний",
      "LV"
    ]
  },
  {
    slug: "solis-s6-eh3p15k-h",
    title: "Solis S6-EH3P15K-H",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p15k-h.png",
    shortDescription: "Solis S6-EH3P15K-H: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P15K-H бренду Solis з оновленого прайсу 01.05.2026, розділ «Високовольтні Гібридні Solis». 15kWt 3Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 15kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "15kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Гібридний",
      "HV"
    ]
  },
  {
    slug: "solis-s6-eh3p20k-h",
    title: "Solis S6-EH3P20K-H",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p20k-h.png",
    shortDescription: "Solis S6-EH3P20K-H: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P20K-H бренду Solis з оновленого прайсу 01.05.2026, розділ «Високовольтні Гібридні Solis». 20kWt 3Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 20kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "20kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Гібридний",
      "HV"
    ]
  },
  {
    slug: "solis-s6-eh3p30k-h",
    title: "Solis S6-EH3P30K-H",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p30k-h.png",
    shortDescription: "Solis S6-EH3P30K-H: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P30K-H бренду Solis з оновленого прайсу 01.05.2026, розділ «Високовольтні Гібридні Solis». 30kWt 3Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 30kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "30kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Гібридний",
      "HV"
    ]
  },
  {
    slug: "solis-s6-eh3p40k-h",
    title: "Solis S6-EH3P40K-H",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p40k-h.png",
    shortDescription: "Solis S6-EH3P40K-H: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P40K-H бренду Solis з оновленого прайсу 01.05.2026, розділ «Високовольтні Гібридні Solis». 40kWt 3Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 40kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "40kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Гібридний",
      "HV"
    ]
  },
  {
    slug: "solis-s6-eh3p50k-h",
    title: "Solis S6-EH3P50K-H",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p50k-h.png",
    shortDescription: "Solis S6-EH3P50K-H: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P50K-H бренду Solis з оновленого прайсу 01.05.2026, розділ «Високовольтні Гібридні Solis». 50kWt 3Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 50kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "50kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Гібридний",
      "HV"
    ]
  },
  {
    slug: "solis-s6-eh3p125k",
    title: "Solis S6-EH3P125K.",
    category: "Інвертори",
    brand: "Solis",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-eh3p125k.png",
    shortDescription: "Solis S6-EH3P125K.: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-EH3P125K. бренду Solis з оновленого прайсу 01.05.2026, розділ «Високовольтні Гібридні Solis». 125kWt 3Ph hybrid inverter with DC,Wifi,CT Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 125kWt, 3 фази, WiFi, CT, DC, Гарантія 5+5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "125kWt",
      "3 фази",
      "WiFi",
      "CT",
      "DC",
      "Гарантія 5+5 років"
    ],
    badges: [
      "Під замовлення",
      "Solis",
      "Гібридний",
      "HV",
      "Очікується"
    ]
  },
  {
    slug: "suen-suen-p5150esa1",
    title: "SUEN-P5150ESA1",
    category: "Акумулятори",
    brand: "SUEN",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/suen-p5150esa1.png",
    shortDescription: "SUEN -P5150ESA1: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення -P5150ESA1 бренду SUEN з оновленого прайсу 01.05.2026. SUEN 2,56kWt, 50AH, 51,2V, LiFePO4, 16sp1, BMS , 6000 циклів Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 2,56kWt, LiFePO4, 51,2V, 50AH, Гарантія 10 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "2,56kWt",
      "LiFePO4",
      "51,2V",
      "50AH",
      "Гарантія 10 років"
    ],
    badges: [
      "Є в наявності",
      "SUEN",
      "LV",
      "LiFePO4"
    ]
  },
  {
    slug: "dahai-dahai-sdc10-box5",
    title: "DAHAI SDC10-BOX5",
    category: "Акумулятори",
    brand: "Dahai",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/dahai-sdc10-box5.png",
    shortDescription: "Dahai SDC10-BOX5: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення SDC10-BOX5 бренду Dahai з оновленого прайсу 01.05.2026. Dahai SDC10-BOX5 5,12 kWt, 100AH, 51,2V, LiFePO4, 16sp1, BMS Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5,12 kWt, LiFePO4, 51,2V, 100AH, Гарантія 10 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5,12 kWt",
      "LiFePO4",
      "51,2V",
      "100AH",
      "Гарантія 10 років"
    ],
    badges: [
      "Немає в наявності",
      "Dahai",
      "LV",
      "LiFePO4"
    ]
  },
  {
    slug: "suen-suen-51-100",
    title: "SUEN-51-100",
    category: "Акумулятори",
    brand: "SUEN",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/suen-51-100.png",
    shortDescription: "SUEN -51-100: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення -51-100 бренду SUEN з оновленого прайсу 01.05.2026. SUEN 5,12 Квт LV Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: LV, Гарантія 10 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "LV",
      "Гарантія 10 років"
    ],
    badges: [
      "Є в наявності",
      "SUEN",
      "LV",
      "LiFePO4"
    ]
  },
  {
    slug: "lithium-valley-lv-bst-h5-12aa",
    title: "Lithium Valley LV-BST-H5.12Aa",
    category: "Акумулятори",
    brand: "Lithium Valley",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lithium-valley-lv-bst-h5-12aa.png",
    shortDescription: "Lithium Valley LV-BST-H5.12Aa: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення LV-BST-H5.12Aa бренду Lithium Valley з оновленого прайсу 01.05.2026. Lithium Valley HV 5.12KWH Module Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: 5.12KWH, HV, LV, Гарантія 10 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "5.12KWH",
      "HV",
      "LV",
      "Гарантія 10 років"
    ],
    badges: [
      "Є в наявності",
      "Lithium Valley",
      "HV",
      "LV",
      "LiFePO4"
    ]
  },
  {
    slug: "lithium-valley-lithium-valley-hv-control-box-bms",
    title: "Lithium Valley HV Control Box(BMS)",
    category: "Акумулятори",
    brand: "Lithium Valley",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/lithium-valley-hv-control-box-bms.png",
    shortDescription: "Lithium Valley HV Control Box(BMS): акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення HV Control Box(BMS) бренду Lithium Valley з оновленого прайсу 01.05.2026. Lithium Valley HV Control Box(BMS) Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: HV, Гарантія 10 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "HV",
      "Гарантія 10 років"
    ],
    badges: [
      "Є в наявності",
      "Lithium Valley",
      "HV",
      "LiFePO4"
    ]
  },
  {
    slug: "suen-hv-g2-g12-pro-series",
    title: "SUEN HV-G2~G12 Pro Series",
    category: "Акумулятори",
    brand: "SUEN",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-battery.svg",
    shortDescription: "SUEN HV-G2~G12 Pro Series: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення HV-G2~G12 Pro Series бренду SUEN з оновленого прайсу 01.05.2026. SUEN 5,12 Квт HV Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: HV, Гарантія 10 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "HV",
      "Гарантія 10 років"
    ],
    badges: [
      "Є в наявності",
      "SUEN",
      "HV",
      "LiFePO4"
    ]
  },
  {
    slug: "suen-suen-bms-hv",
    title: "SUEN BMS HV",
    category: "Акумулятори",
    brand: "SUEN",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-battery.svg",
    shortDescription: "SUEN BMS HV: акумуляторне рішення для накопичення енергії.",
    description: "Акумуляторне рішення BMS HV бренду SUEN з оновленого прайсу 01.05.2026. SUEN BMS HV Підходить для резервного живлення, автономності та масштабування енергосистеми. Ключові характеристики: HV, Гарантія 10 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "HV",
      "Гарантія 10 років"
    ],
    badges: [
      "Є в наявності",
      "SUEN",
      "HV",
      "LiFePO4"
    ]
  },
  {
    slug: "solis-s5-gr3p15k",
    title: "Solis S5-GR3P15K",
    category: "Інвертори",
    brand: "Solis",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s5-gr3p15k.png",
    shortDescription: "Solis S5-GR3P15K: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S5-GR3P15K бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 15kW 3Ph Inverter, 2 MPPT, DC Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 15kW, 3 фази, 2 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "15kW",
      "3 фази",
      "2 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Під замовлення",
      "Solis",
      "Мережевий",
      "Очікується"
    ]
  },
  {
    slug: "solis-s5-gr3p17k",
    title: "Solis S5-GR3P17K",
    category: "Інвертори",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s5-gr3p17k.png",
    shortDescription: "Solis S5-GR3P17K: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S5-GR3P17K бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 17kW 3Ph Inverter, 2 MPPT, DC Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 17kW, 3 фази, 2 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "17kW",
      "3 фази",
      "2 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Мережевий"
    ]
  },
  {
    slug: "solis-s5-gr3p20k",
    title: "Solis S5-GR3P20K",
    category: "Інвертори",
    brand: "Solis",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s5-gr3p20k.png",
    shortDescription: "Solis S5-GR3P20K: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S5-GR3P20K бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 20kW 3Ph Inverter, 2 MPPT, DC Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 20kW, 3 фази, 2 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "20kW",
      "3 фази",
      "2 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Під замовлення",
      "Solis",
      "Мережевий",
      "Очікується"
    ]
  },
  {
    slug: "solis-s5-gc30k",
    title: "Solis S5-GC30K",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s5-gc30k.png",
    shortDescription: "Solis S5-GC30K: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S5-GC30K бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 30kW 3Ph Inverter, 3 MPPT, DC Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 30kW, 3 фази, 3 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "30kW",
      "3 фази",
      "3 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Мережевий"
    ]
  },
  {
    slug: "solis-s5-gc50k",
    title: "Solis S5-GC50K",
    category: "Інвертори",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s5-gc50k.png",
    shortDescription: "Solis S5-GC50K: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S5-GC50K бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 50kW 3Ph Inverter, 5 MPPT, DC, PID Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 50kW, 3 фази, 5 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "50kW",
      "3 фази",
      "5 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Мережевий"
    ]
  },
  {
    slug: "solis-s5-gc60k",
    title: "Solis S5-GC60K",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s5-gc60k.png",
    shortDescription: "Solis S5-GC60K: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S5-GC60K бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 60kW 3Ph Inverter, 5 MPPT, DC, PID Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 60kW, 3 фази, 5 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "60kW",
      "3 фази",
      "5 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Мережевий"
    ]
  },
  {
    slug: "solis-solis-100k-5g-pro",
    title: "Solis-100K-5G-PRO",
    category: "Інвертори",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-100k-5g-pro.png",
    shortDescription: "Solis -100K-5G-PRO: інвертор для сонячних та резервних енергосистем.",
    description: "Модель -100K-5G-PRO бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 100kW 3Ph Inverter, 8 MPPT, DC (without AC switch and PID) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 100kW, 3 фази, 8 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "100kW",
      "3 фази",
      "8 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Мережевий"
    ]
  },
  {
    slug: "solis-solis-110k-5g-pro",
    title: "Solis-110K-5G-PRO",
    category: "Інвертори",
    brand: "Solis",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-110k-5g-pro.png",
    shortDescription: "Solis -110K-5G-PRO: інвертор для сонячних та резервних енергосистем.",
    description: "Модель -110K-5G-PRO бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 110kW 3Ph Inverter, 8 MPPT, DC (without AC switch and PID) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 110kW, 3 фази, 8 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "110kW",
      "3 фази",
      "8 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Під замовлення",
      "Solis",
      "Мережевий",
      "Очікується"
    ]
  },
  {
    slug: "solis-s6-gc125k",
    title: "Solis S6-GC125K",
    category: "Інвертори",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-gc125k.png",
    shortDescription: "Solis S6-GC125K: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-GC125K бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 125kW 3Ph Inverter, 8 MPPT, DC (without AC switch and PID) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 125kW, 3 фази, 8 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "125kW",
      "3 фази",
      "8 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Мережевий"
    ]
  },
  {
    slug: "solis-s6-gu350k-ehv",
    title: "Solis S6-GU350K-EHV",
    category: "Інвертори",
    brand: "Solis",
    availability: "preorder",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s6-gu350k-ehv.png",
    shortDescription: "Solis S6-GU350K-EHV: інвертор для сонячних та резервних енергосистем.",
    description: "Модель S6-GU350K-EHV бренду Solis з оновленого прайсу 01.05.2026, розділ «Мережеві Solis». 350kW 3Ph Inverter, 6 MPPT, DC (without AC switch and PID) Підходить для сонячних, гібридних або резервних систем, де важливі стабільна робота, моніторинг і сумісність з енергетичним обладнанням. Ключові характеристики: 350kW, 3 фази, 6 MPPT, DC, Гарантія 5 років. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "350kW",
      "3 фази",
      "6 MPPT",
      "DC",
      "Гарантія 5 років"
    ],
    badges: [
      "Під замовлення",
      "Solis",
      "Мережевий",
      "HV"
    ]
  },
  {
    slug: "swi-solar-swi54d35-tp",
    title: "Swi Solar SWI54D35-TP",
    category: "Сонячні панелі",
    brand: "Swi Solar",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "Swi Solar SWI54D35-TP: сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель SWI54D35-TP бренду Swi Solar з оновленого прайсу 01.05.2026. Swi Solar 450W Full Black Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 450 Вт, 450W, Чорний. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "450 Вт",
      "450W",
      "Чорний"
    ],
    badges: [
      "Немає в наявності",
      "Swi Solar",
      "Сонячна панель"
    ]
  },
  {
    slug: "swi-solar-swi66d60-tp",
    title: "Swi Solar SWI66D60-TP",
    category: "Сонячні панелі",
    brand: "Swi Solar",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "Swi Solar SWI66D60-TP: сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель SWI66D60-TP бренду Swi Solar з оновленого прайсу 01.05.2026. Swi Solar 610W Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 610 Вт, 610W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "610 Вт",
      "610W"
    ],
    badges: [
      "Немає в наявності",
      "Swi Solar",
      "Сонячна панель"
    ]
  },
  {
    slug: "swi-solar-bas1-pro-hjt",
    title: "Swi Solar Bas1 Pro-HJT",
    category: "Сонячні панелі",
    brand: "Swi Solar",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "Swi Solar Bas1 Pro-HJT: сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель Bas1 Pro-HJT бренду Swi Solar з оновленого прайсу 01.05.2026. Swi Solar 720W Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 720 Вт, 720W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "720 Вт",
      "720W"
    ],
    badges: [
      "Є в наявності",
      "Swi Solar",
      "Сонячна панель"
    ]
  },
  {
    slug: "longi-lr8-66hgd-610m",
    title: "LONGI LR8-66HGD 610M",
    category: "Сонячні панелі",
    brand: "LONGI",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "LONGI LR8-66HGD 610M: сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель LR8-66HGD 610M бренду LONGI з оновленого прайсу 01.05.2026. LONGI 610W Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 610 Вт, 610W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "610 Вт",
      "610W"
    ],
    badges: [
      "Є в наявності",
      "LONGI",
      "Сонячна панель"
    ]
  },
  {
    slug: "dahai-dhm72d30-tp",
    title: "Dahai DHM72D30-TP",
    category: "Сонячні панелі",
    brand: "Dahai",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/swi-solar-swi54d35-tp.png",
    shortDescription: "Dahai DHM72D30-TP: сонячна панель для домашніх і комерційних СЕС.",
    description: "Сонячна панель DHM72D30-TP бренду Dahai з оновленого прайсу 01.05.2026. DAHAI SOLAR 590W Підходить для дахових і наземних станцій у приватних та комерційних сценаріях. Ключові характеристики: 590 Вт, 590W. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "590 Вт",
      "590W"
    ],
    badges: [
      "Є в наявності",
      "Dahai",
      "Сонячна панель"
    ]
  },
  {
    slug: "solis-s5-wifi-st",
    title: "Solis S5-WiFi-ST",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s5-wifi-st.png",
    shortDescription: "Solis S5-WiFi-ST: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція S5-WiFi-ST бренду Solis з оновленого прайсу 01.05.2026. Solis S5-WiFi-ST 4 Pin / USB Datalogger Stick, SolisCloud ready Ключові характеристики: WiFi. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "WiFi"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-s3-gprs-st",
    title: "Solis S3-GPRS-ST",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-s3-gprs-st.png",
    shortDescription: "Solis S3-GPRS-ST: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція S3-GPRS-ST бренду Solis з оновленого прайсу 01.05.2026. Solis S3 GPRS Stick, SolisCloud ready Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-acrel-dtsd-1352",
    title: "Solis Acrel DTSD 1352",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-acrel-dtsd-1352.png",
    shortDescription: "Solis Acrel DTSD 1352: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Acrel DTSD 1352 бренду Solis з оновленого прайсу 01.05.2026. Meter for EPM and consumption monitoring function on 3PH Inverters <40kW (Inline) Ключові характеристики: 40kW, 3PH. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "40kW",
      "3PH"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-solis-epm3-5g-plus",
    title: "Solis-EPM3-5G-PLUS",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-epm3-5g-plus.png",
    shortDescription: "Solis -EPM3-5G-PLUS: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція -EPM3-5G-PLUS бренду Solis з оновленого прайсу 01.05.2026. Solis EPM Export Manager 5G-PLUS (For 3Ph Sites) Ключові характеристики: 3 фази. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "3 фази"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-ct-300a",
    title: "Solis CT-300A",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "Solis CT-300A: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція CT-300A бренду Solis з оновленого прайсу 01.05.2026. Трансформатор струму 300A (AKH-0.66/I 30I 300/5) Acrel Ключові характеристики: CT. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "CT"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-ct-600a",
    title: "Solis CT-600A",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "Solis CT-600A: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція CT-600A бренду Solis з оновленого прайсу 01.05.2026. Трансформатор струму 600A (AKH-0.66/I 30I 600/5) Acrel Ключові характеристики: CT. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "CT"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-mc4-connector-30a",
    title: "Solis MC4 CONNECTOR 30A",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/images/solis-mc4-connector-30a.png",
    shortDescription: "Solis MC4 CONNECTOR 30A: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція MC4 CONNECTOR 30A бренду Solis з оновленого прайсу 01.05.2026. Конектор для сонячних панелей MC-4, 1500V DC, 30A, IP67 Ключові характеристики: 1500V, DC. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "1500V",
      "DC"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-соларний-кабель-кве-4мм-чорний-німеччина",
    title: "KBE Соларний кабель КВЕ 4мм чорний (Німеччина)",
    category: "Комплектуючі",
    brand: "KBE",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "KBE Соларний кабель КВЕ 4мм чорний (Німеччина): комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Соларний кабель КВЕ 4мм чорний (Німеччина) бренду KBE з оновленого прайсу 01.05.2026. Соларний кабель КВЕ 4мм чорний (Німеччина) Ключові характеристики: Чорний. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Чорний"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-соларний-кабель-кве-4мм-червоний-німеччина",
    title: "KBE Соларний кабель КВЕ 4мм червоний (Німеччина)",
    category: "Комплектуючі",
    brand: "KBE",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "KBE Соларний кабель КВЕ 4мм червоний (Німеччина): комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Соларний кабель КВЕ 4мм червоний (Німеччина) бренду KBE з оновленого прайсу 01.05.2026. Соларний кабель КВЕ 4мм червоний (Німеччина) Ключові характеристики: Червоний. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Червоний"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-гвинт-шуруп-м10-200-а2-нержавійка",
    title: "Solis Гвинт-шуруп М10*200 А2 нержавійка",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "available",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "Solis Гвинт-шуруп М10*200 А2 нержавійка: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Гвинт-шуруп М10*200 А2 нержавійка бренду Solis з оновленого прайсу 01.05.2026. Гвинт-шуруп М10*200 А2 нержавійка Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Є в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-притиск-міжпанельний-збірка",
    title: "Solis Притиск міжпанельний(збірка)",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "Solis Притиск міжпанельний(збірка): комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Притиск міжпанельний(збірка) бренду Solis з оновленого прайсу 01.05.2026. Притиск міжпанельний(збірка) Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-сонячний-профіль-оцинкований-41х41х-4-2м-3м",
    title: "Solis Сонячний профіль оцинкований 41х41х 4,2м/3м",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "Solis Сонячний профіль оцинкований 41х41х 4,2м/3м: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція Сонячний профіль оцинкований 41х41х 4,2м/3м бренду Solis з оновленого прайсу 01.05.2026. Сонячний профіль оцинкований 41х41х 4,2м/3м Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Комплектуючі"
    ]
  },
  {
    slug: "solis-з-єднувач-для-профілю-41l-0-2-м",
    title: "Solis З’єднувач для профілю 41L = , 0,2 м",
    category: "Комплектуючі",
    brand: "Solis",
    availability: "out_of_stock",
    price: 10000,
    rating: 4.8,
    reviews: 0,
    image: "/illustrations/product-kit.svg",
    shortDescription: "Solis З’єднувач для профілю 41L = , 0,2 м: комплектуючий елемент для сонячної енергосистеми.",
    description: "Комплектуюча позиція З’єднувач для профілю 41L = , 0,2 м бренду Solis з оновленого прайсу 01.05.2026. З’єднувач для профілю 41L = , 0,2 м Ключові характеристики: Сумісність із системами СЕС. Ціна на вітрині тимчасово встановлена як 10 000 грн.",
    specs: [
      "Сумісність із системами СЕС"
    ],
    badges: [
      "Немає в наявності",
      "Solis",
      "Комплектуючі"
    ]
  }
];

export const cases: CaseItem[] = [
  {
    slug: 'home-10kwt-kyiv-region',
    title: 'Приватний будинок 10 кВт + батарея 10 кВт*год',
    segment: 'Будинок',
    location: 'Київська область',
    result: 'Зниження рахунку за електроенергію на 47% та стабільний резерв ключових ліній.',
    system: '24 панелі + гібридний інвертор + LiFePO4',
    image: '/illustrations/case-home.svg',
  },
  {
    slug: 'store-20kwt-dnipro',
    title: 'Магазин 20 кВт для денної генерації',
    segment: 'Комерція',
    location: 'Дніпро',
    result: 'Стабілізація витрат і підтримка касової зони під час відключень.',
    system: 'Комерційна станція 20 кВт',
    image: '/illustrations/case-commercial.svg',
  },
  {
    slug: 'apartment-backup-lviv',
    title: 'Квартира: резерв 3.5 кВт',
    segment: 'Квартира',
    location: 'Львів',
    result: 'Автономність інтернету, освітлення та базової техніки до 8 годин.',
    system: 'Інвертор + акумуляторний модуль',
    image: '/illustrations/case-apartment.svg',
  },
  {
    slug: 'workshop-30kwt-odesa',
    title: 'Виробництво 30 кВт із поетапним розширенням',
    segment: 'Бізнес',
    location: 'Одеса',
    result: 'Скорочення денного піку та гнучкий сценарій масштабування за навантаженням.',
    system: 'Трифазна гібридна система 30 кВт',
    image: '/illustrations/case-business.svg',
  },
];

export const categoryOrder: ProductCategory[] = ['Сонячні панелі', 'Інвертори', 'Акумулятори', 'Системи зберігання', 'Комплектуючі'];

export const generatorPacks: GeneratorPack[] = [
  {
    key: 'apartment',
    title: 'Квартира 5 кВт',
    objectLabel: 'Квартира',
    generationPower: 5,
    summary: 'Резерв і базова генерація для квартири.',
    composition: [
      { slug: 'deye-sun-05k-sg05lp1-eu-am2-plus-deye-wifi-5-kw-1-фаза-2-mppt-lv', qty: 1 },
      { slug: 'deye-se-g5-1-pro-b-lifepo4-51-2v-100ah', qty: 1 },
      { slug: 'canadian-solar-canadian-solar-cs6w-585w-t', qty: 8 },
    ],
  },
  {
    key: 'house',
    title: 'Будинок 15 кВт',
    objectLabel: 'Будинок',
    generationPower: 15,
    summary: 'Збалансована система для приватного будинку.',
    composition: [
      { slug: 'deye-sun-05k-sg05lp1-eu-am2-plus-deye-wifi-5-kw-1-фаза-2-mppt-lv', qty: 1 },
      { slug: 'deye-комплект-акумуляторна-батарея-модуль-al-w5-1-b-module-deye-lifepo4-51-2v-100ah-5-', qty: 1 },
      { slug: 'canadian-solar-canadian-solar-cs6w-585w-t', qty: 24 },
    ],
  },
  {
    key: 'business',
    title: 'Бізнес 30 кВт',
    objectLabel: 'Бізнес',
    generationPower: 30,
    summary: 'Комерційний комплект для стабільної роботи обʼєкта.',
    composition: [
      { slug: 'deye-sun-05k-sg05lp1-eu-am2-plus-deye-wifi-5-kw-1-фаза-2-mppt-lv', qty: 2 },
      { slug: 'deye-комплект-акумуляторна-батарея-модуль-al-w5-1-b-module-deye-lifepo4-51-2v-100ah-5-', qty: 2 },
      { slug: 'canadian-solar-canadian-solar-cs6w-585w-t', qty: 44 },
    ],
  },
];

export const brandLogos: BrandLogo[] = [
  {
    name: "Canadian Solar",
    logoUrl: "https://www.google.com/s2/favicons?domain=csisolar.com&sz=128"
  },
  {
    name: "Dahai",
    logoUrl: "https://www.google.com/s2/favicons?domain=dahaisolar.com&sz=128"
  },
  {
    name: "Deye",
    logoUrl: "https://www.google.com/s2/favicons?domain=deyeinverter.com&sz=128"
  },
  {
    name: "Dyness",
    logoUrl: "https://www.google.com/s2/favicons?domain=dyness.com&sz=128"
  },
  {
    name: "Felicity",
    logoUrl: "https://www.google.com/s2/favicons?domain=felicitysolar.com&sz=128"
  },
  {
    name: "LONGI",
    logoUrl: "https://www.google.com/s2/favicons?domain=longi.com&sz=128"
  },
  {
    name: "Lithium Valley",
    logoUrl: "https://www.google.com/s2/favicons?domain=lithiumvalley.com&sz=128"
  },
  {
    name: "SUEN",
    logoUrl: "https://www.google.com/s2/favicons?domain=suen.com.ua&sz=128"
  },
  {
    name: "Solis",
    logoUrl: "https://www.google.com/s2/favicons?domain=solisinverters.com&sz=128"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((item) => item.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  return products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
}

export function getGeneratorPackByKey(key: GeneratorPackKey): GeneratorPack | undefined {
  return generatorPacks.find((item) => item.key === key);
}
