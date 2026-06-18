import { type Page, type Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Dynamically locates a product title by matching text case-insensitively.
   * @param partialText e.g., "iphone 17e 256gb"
   */
  getProductLink(partialText: string): Locator {
    // Splits text into a regex pattern that ignores spaces/case gracefully
    const formattedText = partialText.replace(/\s+/g, '.*');
    return this.page.locator('.s-asin a:has(h2)').filter({ hasText: new RegExp(formattedText, 'i') });
  }

  async clickFirstProduct(partialText: string) {
    const targetProduct = this.getProductLink(partialText).first();
    await targetProduct.click();
  }

  async openFirstProduct(partialText: string): Promise<Page> {
    const targetProduct = this.getProductLink(partialText).first();
    await expect(targetProduct).toBeVisible();

    const initialUrl = this.page.url();
    const href = await targetProduct.getAttribute('href');
    const newPagePromise = this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null);
    const navigationPromise = this.page
      .waitForURL((url) => url.toString() !== initialUrl, { timeout: 5000 })
      .catch(() => null);

    await targetProduct.click();

    const productPage = await Promise.race([newPagePromise, navigationPromise]);
    if (productPage) {
      await productPage.waitForLoadState('domcontentloaded');
      return productPage;
    }

    if (this.page.url() === initialUrl && href) {
      await this.page.goto(new URL(href, this.page.url()).toString(), { waitUntil: 'domcontentloaded' });
    }

    await this.page.waitForLoadState('domcontentloaded');
    return this.page;
  }

  async isProductVisible(partialText: string) {
    await expect(this.getProductLink(partialText).first()).toBeVisible();
  }
}
