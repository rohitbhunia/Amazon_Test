import { Page, Locator, expect } from '@playwright/test';

export class PaymentPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly proceedToCheckoutButton!: Locator;
    readonly paymentMethodSection!: Locator;

    constructor(page: Page, cartLink: Locator) {
        this.page = page;
        this.cartLink = cartLink;
    }

    async openCart() {
        await this.cartLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

     async proceedToBuy1() {
    await this.proceedToCheckoutButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.paymentMethodSection).toBeVisible();
    await this.paymentMethodSection.click
  }
}
