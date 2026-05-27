export type SocialLink = {
  label: string;
  href: string;
};

export type AboutContent = {
  image: string;
  badge: string;
  title: string;
  text: string;
  socialsTitle: string;
  socials: SocialLink[];
};

export const defaultAboutContent: AboutContent = {
  image: '/images/hero-sunergy-showroom.jpg',
  badge: 'Про нас',
  title: 'SUNERGY.UA - енергетичні рішення, яким довіряють',
  text:
    'SUNERGY.UA допомагає клієнтам отримувати стабільну енергію для дому та бізнесу. Ми підбираємо сонячні станції, інвертори, акумулятори, системи кріплень і готові комплекти під конкретні задачі, супроводжуючи проєкт від консультації до запуску.',
  socialsTitle: 'Ми в соцмережах',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/sunergyua?igsh=MW5ybzI2eWZza28yNQ==' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@sunergy.ua?_r=1&_t=ZS-96NgNvkeIlh' },
    { label: 'Telegram', href: 'https://t.me/sunergyua' },
  ],
};
