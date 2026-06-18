import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly addedToCartMessage: Locator;
  readonly cartCount: Locator;
  readonly cartLink: Locator;
  readonly cartProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('span#productTitle');
    this.addToCartButton = page.locator('#add-to-cart-button:visible');
    this.addedToCartMessage = page.getByText(/added to cart/i).first();
    this.cartCount = page.locator('#nav-cart-count');
    this.cartLink = page.locator('#nav-cart');
    this.cartProduct = page.locator('#sc-active-cart').getByRole('heading', { name: /iphone.*17e.*256/i }).first();
  }

  async verifyProductTitle() {
    await expect(this.productTitle).toBeVisible();
    await expect(this.productTitle).toContainText(/iphone/i);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async verifyProductAddedToCart() {
    await expect(this.addedToCartMessage).toBeVisible();
    await expect(this.cartCount).toHaveText('1');
  }

  async openCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyProductVisibleInCart() {
    await expect(this.page).toHaveURL(/cart|gp\/cart/i);
    await expect(this.cartProduct).toBeVisible();
  }
}
