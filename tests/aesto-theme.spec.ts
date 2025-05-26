import { test, expect } from '@playwright/test';

// Define configurations for each language
const languageConfigs = [
  {
    lang: 'EN',
    baseUrl: 'https://www.thedavestack.com',
    logo: {
      src: 'https://www.thedavestack.com/content/images/2025/04/The-dave-stack-logo.png',
      href: 'https://www.thedavestack.com',
      altText: 'The Dave Stack' // Assuming alt text is the same, or configure if different per language
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
    // Note: In your original ES test, you had BASE_URL_ES = 'https://en.thedavestack.com'
    // but the language dropdown HTML and hrefs in your ES tests pointed to 'https://es.thedavestack.com'.
    // I'm using 'https://es.thedavestack.com' as it seems more consistent. Adjust if necessary.
    baseUrl: 'https://es.thedavestack.com',
    logo: {
      src: 'https://es.thedavestack.com/content/images/2025/04/The-dave-stack-logo.png',
      href: 'https://es.thedavestack.com',
      altText: 'The Dave Stack' // Assuming alt text is the same, or configure if different per language
    },
    menuItems: [
      { text: "Inicio", href: 'https://es.thedavestack.com/' },
      { text: "Autores", href: 'https://es.thedavestack.com/authors/' },
      { text: "Tags", href: 'https://es.thedavestack.com/tags-cloud/' }
    ],
    popularTags: [
      "Inteligencia Artificial",
      "Herramientas IA",
      "AI Monthly Roundup", // This one seems the same in both; verify if it should be translated on the ES site
      "DevOps",             // This one also seems the same
      "Desarrollo de Software"
    ]
  }
];

test.describe('The Dave Stack Main Page Verification - Multilingual', () => {

  for (const config of languageConfigs) {

    test(`${config.lang}. Check Logo on the main page`, async ({ page }) => {
      await page.goto(config.baseUrl);

      // Logo Checks
      // Assuming the alt text for the logo might also be language-specific or stay "The Dave Stack"
      const logoImage = page.locator(`a.it-head-logo img[alt="${config.logo.altText}"]`);
      await expect(logoImage).toBeVisible({ timeout: 10000 });
      await expect(logoImage).toHaveAttribute('src', config.logo.src);
      
      const logoLink = page.locator('a.it-head-logo');
      await expect(logoLink).toHaveAttribute('href', config.logo.href);
    });

    test(`${config.lang}. Check Navigation Menu (Navbar) on the main page`, async ({ page }) => {
      await page.goto(config.baseUrl);

      // Navigation Menu Checks
      const navLinks = page.locator('div.it-head-menu ul.nav li a');
      await expect(navLinks).toHaveCount(config.menuItems.length, { timeout: 10000 });

      for (let i = 0; i < config.menuItems.length; i++) {
        const link = navLinks.nth(i);
        const expectedItem = config.menuItems[i];
        
        await expect(link).toBeVisible();
        const linkText = await link.textContent();
        expect(linkText?.trim()).toBe(expectedItem.text); // Verifying exact text
        await expect(link).toHaveAttribute('href', expectedItem.href);
      }
    });

    test(`${config.lang}. Check "Popular Tags" Section on the main page`, async ({ page }) => {
      await page.goto(config.baseUrl);

      // "Popular Tags" Section Checks
      const popularTagsSectionContainer = page.locator('div.it-popular-tags.it-grid-c3');
      await expect(popularTagsSectionContainer).toBeVisible({ timeout: 10000 });

      // IMPORTANT!! Review and adjust this list with the tags you consider "adequate"
      // and expect to be consistently present in this section for this language.
      for (const tagName of config.popularTags) {
        // This selector looks for an <a> tag within .it-popular-tags-item .it-popular-tags-title
        // that exactly matches the tagName (allowing for surrounding whitespace).
        const tagLink = popularTagsSectionContainer.locator(`.it-popular-tags-item .it-popular-tags-title a`, { hasText: new RegExp(`^\\s*${tagName}\\s*$`) });
        await expect(tagLink.first()).toBeVisible({ timeout: 7000 }); // Wait for each expected tag to be visible
      }
      
      const allPopularTagTitles = popularTagsSectionContainer.locator('.it-popular-tags-item .it-popular-tags-title a');
      // This assertion ensures that at least the expected tags are present,
      // but allows for more popular tags if the list is dynamic.
      expect(await allPopularTagTitles.count()).toBeGreaterThanOrEqual(config.popularTags.length);
    });
  }
});