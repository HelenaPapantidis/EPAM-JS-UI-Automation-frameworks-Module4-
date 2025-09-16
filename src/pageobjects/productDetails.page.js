import BasePage from "./page.js";

const SELECTORS = {
  productTitle: 'h1[data-test="product-name"]',
  productTag: '[data-test="product-tag"]',
  productPrice: '[data-test="product-price"]',
  productDescription: '[data-test="product-description"]',
  quantityInput: 'input[data-test="quantity"]',
  addToBasketButton: 'button[data-test="add-to-cart"]',
  addToFavouritesButton: 'button[data-test="add-to-favourites"]',
};

class ProductDetailsPage extends BasePage {
  get productTitle() { return this.el(SELECTORS.productTitle); }
  get productTag() { return this.el(SELECTORS.productTag); }
  get productPrice() { return this.el(SELECTORS.productPrice); }
  get productDescription() { return this.el(SELECTORS.productDescription); }
  get quantityInput() { return this.el(SELECTORS.quantityInput); }
  get addToBasketButton() { return this.el(SELECTORS.addToBasketButton); }
  get addToFavouritesButton() { return this.el(SELECTORS.addToFavouritesButton); }

  async setQuantity(qty) {
  await this.quantityInput.waitForDisplayed();
  await this.quantityInput.clearValue();
  await this.quantityInput.setValue(qty);
}

  async addToBasket() {
  await this.addToBasketButton.waitForClickable();
  await this.addToBasketButton.click();
}

  async addToFavourites() {
    await this.addToFavouritesButton.click();
  }

  async verifyProductDetails(expectedFields) {
    for (let field of expectedFields) {
      const el = await $(`//*[normalize-space()="${field}"]`);
      await expect(el).toBeDisplayed();
    }
  }
}

export default new ProductDetailsPage();
