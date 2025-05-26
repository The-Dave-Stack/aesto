// tests/specs/main-page.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../poms/HomePage';
import { languageConfigs } from '../config/test-data'; // Import configurations

test.describe('The Dave Stack Main Page Verification - Multilingual (POM)', () => {

  for (const config of languageConfigs) {
    let homePage: HomePage; // Declare homePage here to be accessible in all tests for this config

    // Use test.beforeEach to navigate and initialize Page Objects for each test run within this config
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      await homePage.navigateTo(config.baseUrl);
    });

    test(`${config.lang} (${config.name}). Check Logo on the main page`, async () => {
      await homePage.verifyLogo(config.logo);
    });

    test(`${config.lang} (${config.name}). Check Navigation Menu (Navbar) on the main page`, async () => {
      await homePage.verifyNavigationMenu(config.menuItems);
    });

    test(`${config.lang} (${config.name}). Check "Popular Tags" Section on the main page`, async () => {
      await homePage.verifyPopularTags(config.popularTags);
    });
  }
});