// tests/config/test-data.ts

export const languageConfigs = [
  {
    lang: 'EN',
    name: 'English',
    baseUrl: 'https://www.thedavestack.com',
    logo: {
      src: 'https://www.thedavestack.com/content/images/2025/04/The-dave-stack-logo.png',
      href: 'https://www.thedavestack.com',
      altText: 'The Dave Stack'
    },
    menuItems: [
      { text: "Home", href: 'https://www.thedavestack.com/' },
      { text: "Authors", href: 'https://www.thedavestack.com/authors/' },
      { text: "Tags", href: 'https://www.thedavestack.com/tags-cloud/' }
    ],
    popularTags: [
      "Artificial Intelligence",
      "AI Tools",
      "AI Monthly Roundup",
      "DevOps",
      "Software Development"
    ]
  },
  {
    lang: 'ES',
    name: 'Spanish',
    baseUrl: 'https://es.thedavestack.com', // Verify this is the correct Spanish base URL
    logo: {
      src: 'https://es.thedavestack.com/content/images/2025/04/The-dave-stack-logo.png',
      href: 'https://es.thedavestack.com',
      altText: 'The Dave Stack' // Assuming same alt text, adjust if it's localized
    },
    menuItems: [
      { text: "Inicio", href: 'https://es.thedavestack.com/' },
      { text: "Autores", href: 'https://es.thedavestack.com/authors/' },
      { text: "Tags", href: 'https://es.thedavestack.com/tags-cloud/' }
    ],
    popularTags: [
      "Inteligencia Artificial",
      "Herramientas IA",
      "AI Monthly Roundup",
      "DevOps",
      "Desarrollo de Software"
    ]
  }
];

// Interface for menu item structure (optional, but good for type safety)
export interface MenuItem {
  text: string;
  href: string;
}

// Interface for logo structure (optional)
export interface LogoConfig {
  src: string;
  href: string;
  altText: string;
}