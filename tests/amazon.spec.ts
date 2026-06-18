import { test, expect } from './Fixtures/test-base';
import { ProductPage } from './pages/productPage';

test.describe('Amazon Product Validation', () => {

  test('Title validation', async ({ page, homePage }) => {
    await homePage.navigate();
    await expect(page).toHaveTitle(/Amazon.in/);
  });

  test('Locate iPhone 17e 256GB Dynamically', async ({
    homePage,
    searchResultsPage
  }) => {

    const productName = 'iphone 17e 256gb';

    await homePage.navigate();
    await homePage.searchFor(productName);

    const product = searchResultsPage.getProductLink(productName).first();

    await expect(product).toBeVisible();
    await expect(product).toContainText(/iphone/i);

    const productTab = await searchResultsPage.openFirstProduct(productName);

    await expect(productTab).toHaveTitle(/iphone/i);
  });

  test('Add product to cart', async ({
    homePage,
    searchResultsPage
  }) => {

    const productName = 'iphone 17e 256gb';

    await homePage.navigate();
    await homePage.searchFor(productName);

    const productTab = await searchResultsPage.openFirstProduct(productName);

    const productPage = new ProductPage(productTab);

    await productPage.verifyProductTitle();

    await productPage.addToCart();

    await productPage.verifyProductAddedToCart();

    await productPage.openCart();

    await productPage.verifyProductVisibleInCart();

    await productPage.verifyProductReadyForCheckout();

    await productPage.proceedToBuy();

    const amazonEmail = process.env.AMAZON_EMAIL;
const amazonPassword = process.env.AMAZON_PASSWORD;

if (!amazonEmail || !amazonPassword) {
  throw new Error('Amazon credentials are missing in .env file');
}

await productPage.signInPage(
  amazonEmail,
  amazonPassword
);
  });

});