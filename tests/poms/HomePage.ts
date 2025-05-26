// tests/poms/HomePage.ts
import { type Page, type Locator, expect } from '@playwright/test';
import type { MenuItem, LogoConfig } from '../config/test-data'; // Import interfaces

export class HomePage {
  // readonly es un modificador de TypeScript que asegura que la propiedad solo se asigne en el constructor.
  readonly page: Page;
  readonly logoImage: Locator;
  readonly logoLink: Locator;
  readonly navMenuContainer: Locator; // Contenedor del menú de navegación
  readonly popularTagsSectionContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define locators for elements on the Home Page
    this.logoLink = page.locator('a.it-head-logo');
    this.logoImage = this.logoLink.locator('img'); // Logo image is within the logo link
    this.navMenuContainer = page.locator('div.it-head-menu ul.nav');
    this.popularTagsSectionContainer = page.locator('div.it-popular-tags.it-grid-c3');
  }

  // Navigation method
  async navigateTo(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }

  // --- Methods for Logo Verification ---
  async verifyLogo(logoConfig: LogoConfig): Promise<void> {
    await expect(this.logoImage).toBeVisible({ timeout: 10000 });
    await expect(this.logoImage).toHaveAttribute('src', logoConfig.src);
    await expect(this.logoImage).toHaveAttribute('alt', logoConfig.altText);
    await expect(this.logoLink).toHaveAttribute('href', logoConfig.href);
  }

  // --- Methods for Navigation Menu Verification ---
  async verifyNavigationMenu(expectedMenuItems: MenuItem[]): Promise<void> {
    const navLinks = this.navMenuContainer.locator('li a'); // Links are <a> within <li>
    await expect(navLinks).toHaveCount(expectedMenuItems.length, { timeout: 10000 });

    for (let i = 0; i < expectedMenuItems.length; i++) {
      const linkElement = navLinks.nth(i);
      const expectedItem = expectedMenuItems[i];
      
      await expect(linkElement).toBeVisible();
      const linkText = await linkElement.textContent();
      expect(linkText?.trim()).toBe(expectedItem.text);
      await expect(linkElement).toHaveAttribute('href', expectedItem.href);
    }
  }

  // --- Methods for Popular Tags Verification ---
  async verifyPopularTags(expectedPopularTags: string[]): Promise<void> {
    await expect(this.popularTagsSectionContainer).toBeVisible({ timeout: 10000 });

    for (const tagName of expectedPopularTags) {
      const tagLink = this.popularTagsSectionContainer.locator(
        // Buscamos un enlace <a> que es hijo directo de .it-popular-tags-title
        // y que a su vez es hijo de .it-popular-tags-item
        `.it-popular-tags-item .it-popular-tags-title a`, 
        { hasText: new RegExp(`^\\s*${tagName}\\s*$`) }
      );
      await expect(tagLink.first()).toBeVisible({ timeout: 7000 });
    }
    
    const allPopularTagTitles = this.popularTagsSectionContainer.locator('.it-popular-tags-item .it-popular-tags-title a');
    // Verificamos que al menos el número esperado de tags esté presente
    expect(await allPopularTagTitles.count()).toBeGreaterThanOrEqual(expectedPopularTags.length);
  }
}