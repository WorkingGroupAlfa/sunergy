export type ProductCategory = 'Сонячні панелі' | 'Інвертори' | 'Акумулятори';

export type Product = {
  slug: string;
  title: string;
  category: ProductCategory;
  brand: string;
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
    slug: 'sunergy-home-5kwh-lfp',
    title: 'SUNERGY Home LFP 5 кВт*год',
    category: 'Акумулятори',
    brand: 'SUNERGY',
    price: 49800,
    oldPrice: 54200,
    rating: 4.9,
    reviews: 62,
    image: '/illustrations/product-battery.svg',
    shortDescription: 'Акумулятор для квартири та невеликих систем резерву.',
    description:
      'Власна серія акумуляторів SUNERGY на LiFePO4 елементах. Стабільна робота з гібридними інверторами та високий ресурс циклів.',
    specs: ['5 кВт*год', 'LiFePO4', '6000+ циклів', 'Гарантія 5 років'],
    badges: ['Власне виробництво', 'Хіт продажів'],
  },
  {
    slug: 'sunergy-pro-10kwh-lfp',
    title: 'SUNERGY Pro LFP 10 кВт*год',
    category: 'Акумулятори',
    brand: 'SUNERGY',
    price: 93900,
    rating: 4.8,
    reviews: 37,
    image: '/illustrations/product-battery.svg',
    shortDescription: 'Оптимальний модуль для будинку з підвищеною автономністю.',
    description:
      'Акумулятор SUNERGY для домашніх і комерційних систем. Підтримує масштабування модулів та інтеграцію через CAN/RS485.',
    specs: ['10 кВт*год', 'LiFePO4', 'CAN/RS485', 'Гарантія 7 років'],
    badges: ['Вироблено в Україні', 'Топ продажів'],
  },
  {
    slug: 'sunergy-business-15kwh-lfp',
    title: 'SUNERGY Business LFP 15 кВт*год',
    category: 'Акумулятори',
    brand: 'SUNERGY',
    price: 132000,
    rating: 4.8,
    reviews: 21,
    image: '/illustrations/product-battery.svg',
    shortDescription: 'Рішення для бізнесу з довшим резервом та піковими навантаженнями.',
    description:
      'Промисловий акумуляторний модуль SUNERGY для обʼєктів із критичним енергоспоживанням. Підходить для поетапного розширення системи.',
    specs: ['15 кВт*год', 'LiFePO4', 'BMS промислового класу', 'Гарантія 7 років'],
    badges: ['Власне виробництво', 'Вироблено в Україні'],
  },
  {
    slug: 'longi-hi-mo-x6-585w',
    title: 'LONGi Hi-MO X6 585W',
    category: 'Сонячні панелі',
    brand: 'LONGi',
    price: 6900,
    oldPrice: 7600,
    rating: 4.8,
    reviews: 41,
    image: '/illustrations/product-panels.svg',
    shortDescription: 'Монокристалічна панель для приватного будинку та малого бізнесу.',
    description:
      'Панель з високим ККД і стабільною генерацією за змінної освітленості. Підходить для дахових і наземних станцій.',
    specs: ['585 Вт', 'ККД до 22.6%', 'Гарантія 12 років', 'Лінійна гарантія 25 років'],
    badges: ['Хіт', 'Склад Київ'],
  },
  {
    slug: 'ja-solar-jam72d40-580w',
    title: 'JA Solar JAM72D40 580W',
    category: 'Сонячні панелі',
    brand: 'JA Solar',
    price: 6700,
    rating: 4.7,
    reviews: 27,
    image: '/illustrations/product-panels.svg',
    shortDescription: 'Двостороння панель із підвищеною генерацією.',
    description:
      'Ефективна панель для домашніх і комерційних обʼєктів. Добре працює в масивах і за ранкового/вечірнього сонця.',
    specs: ['580 Вт', 'Bifacial', 'ККД до 22.4%', 'Гарантія 12/30 років'],
    badges: ['Bifacial'],
  },
  {
    slug: 'deye-sun-8k-sg04lp3',
    title: 'Deye SUN-8K-SG04LP3',
    category: 'Інвертори',
    brand: 'Deye',
    price: 79800,
    oldPrice: 84500,
    rating: 4.9,
    reviews: 18,
    image: '/illustrations/product-inverter.svg',
    shortDescription: 'Трифазний гібридний інвертор для будинку та бізнесу.',
    description:
      'Підтримує роботу з батареями, резервною лінією та моніторингом через застосунок. Оптимальний для обʼєктів 8-12 кВт.',
    specs: ['8 кВт', '3 фази', 'Wi-Fi моніторинг', 'Гарантія 5 років'],
    badges: ['Топ продажів'],
  },
  {
    slug: 'growatt-spf-5000-es',
    title: 'Growatt SPF 5000 ES',
    category: 'Інвертори',
    brand: 'Growatt',
    price: 42900,
    rating: 4.6,
    reviews: 33,
    image: '/illustrations/product-inverter.svg',
    shortDescription: 'Надійний однофазний інвертор для домашнього резерву.',
    description:
      'Компактний гібридний інвертор для квартири та будинку. Підходить для базових сценаріїв автономності та економії.',
    specs: ['5 кВт', '1 фаза', 'MPPT контролер', 'Гарантія 2 роки'],
    badges: ['Оптимум'],
  },
  {
    slug: 'pylontech-us5000',
    title: 'Pylontech US5000',
    category: 'Акумулятори',
    brand: 'Pylontech',
    price: 56500,
    rating: 4.8,
    reviews: 24,
    image: '/illustrations/product-battery.svg',
    shortDescription: 'LiFePO4 модуль для систем резервного живлення.',
    description:
      'Масштабована батарея з тривалим ресурсом циклів. Підходить для гібридних станцій і резервних систем.',
    specs: ['4.8 кВт*год', 'LiFePO4', '6000+ циклів', 'Гарантія 7 років'],
    badges: ['Надійно'],
  },
  {
    slug: 'dyness-tower-10kwh',
    title: 'Dyness Tower 10kWh',
    category: 'Акумулятори',
    brand: 'Dyness',
    price: 108000,
    rating: 4.7,
    reviews: 11,
    image: '/illustrations/product-battery.svg',
    shortDescription: 'Баштова батарея для глибокого резерву будинку.',
    description:
      'Готове рішення для довшої автономної роботи. Модульна конструкція та стабільна BMS.',
    specs: ['10 кВт*год', 'LiFePO4', 'CAN/RS485', 'Гарантія 10 років'],
    badges: ['Глибокий резерв'],
  },
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

export const categoryOrder: ProductCategory[] = ['Сонячні панелі', 'Інвертори', 'Акумулятори'];

export const generatorPacks: GeneratorPack[] = [
  {
    key: 'apartment',
    title: 'Квартира 5 кВт',
    objectLabel: 'Квартира',
    generationPower: 5,
    summary: 'Резерв і базова генерація для квартири.',
    composition: [
      { slug: 'growatt-spf-5000-es', qty: 1 },
      { slug: 'sunergy-home-5kwh-lfp', qty: 1 },
      { slug: 'longi-hi-mo-x6-585w', qty: 8 },
    ],
  },
  {
    key: 'house',
    title: 'Будинок 15 кВт',
    objectLabel: 'Будинок',
    generationPower: 15,
    summary: 'Збалансована система для приватного будинку.',
    composition: [
      { slug: 'deye-sun-8k-sg04lp3', qty: 1 },
      { slug: 'sunergy-pro-10kwh-lfp', qty: 1 },
      { slug: 'ja-solar-jam72d40-580w', qty: 24 },
    ],
  },
  {
    key: 'business',
    title: 'Бізнес 30 кВт',
    objectLabel: 'Бізнес',
    generationPower: 30,
    summary: 'Комерційний комплект для стабільної роботи обʼєкта.',
    composition: [
      { slug: 'deye-sun-8k-sg04lp3', qty: 2 },
      { slug: 'sunergy-business-15kwh-lfp', qty: 2 },
      { slug: 'longi-hi-mo-x6-585w', qty: 44 },
    ],
  },
];

export const brandLogos: BrandLogo[] = [
  
  { name: 'Deye', logoUrl: 'https://www.google.com/s2/favicons?domain=deyeinverter.com&sz=128' },
  { name: 'Growatt', logoUrl: 'https://www.google.com/s2/favicons?domain=growatt.com&sz=128' },
  { name: 'LONGi', logoUrl: 'https://www.google.com/s2/favicons?domain=longi.com&sz=128' },
  { name: 'JA Solar', logoUrl: 'https://www.google.com/s2/favicons?domain=jasolar.com&sz=128' },

  { name: 'Pylontech', logoUrl: 'https://www.google.com/s2/favicons?domain=pylontech.com.cn&sz=128' },
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


