import { type Page, type Locator } from '@playwright/test';

export class HomePage { 
  private readonly page: Page;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
  }

  async navigate() {
    await this.page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });
  }

  async searchFor(product: string) {
    await this.searchBox.fill(product);
    await this.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}