import BasePage from "./page.js";

/**
 * Centralize selectors for Product Details Page (PDP).
 */
const SELECTORS = {
  productName: 'h1[data-test="product-name"]',
  productTag: '[data-test="product-tag"]',
  productPrice: '[data-test="product-price"]',
  productDescription: '[data-test="product-description"]',
  quantityInput: 'input[data-test="quantity"]',
  addToCartButton: 'button[data-test="add-to-cart"]',
  addToFavouritesButton: 'button[data-test="add-to-favourites"]',
  toastContainer: "#toast-container",
  toastMessage: '#toast-container',
  
};

class ProductDetailsPage extends BasePage {
  // ----- GETTERS -----
  get productName() {
    return this.el(SELECTORS.productName);
  }
  get productTag() {
    return this.el(SELECTORS.productTag);
  }
  get productPrice() {
    return this.el(SELECTORS.productPrice);
  }
  get productDescription() {
    return this.el(SELECTORS.productDescription);
  }
  get quantityInput() {
    return this.el(SELECTORS.quantityInput);
  }
  get addToCartButton() {
    return this.el(SELECTORS.addToCartButton);
  }
  get addToFavouritesButton() {
    return this.el(SELECTORS.addToFavouritesButton);
  }
  get toastMessage() {
    return this.el(SELECTORS.toastMessage);
  }

  // ----- ACTIONS -----
  async addToCart() {
    await this.addToCartButton.click();
  }

  async addToFavourites() {
    await this.addToFavouritesButton.click();
  }

  // asertacije
  async expectProductName(expectedName) {
    await expect(this.productName).toHaveText(expectedName);
  }

  async expectConfirmationMessage(expectedText) {
    // toast zna da zakasni 1–2s; WDIO expect ima auto-wait
    await expect(this.toastMessage).toBeDisplayed();
    await expect(this.toastMessage).toHaveTextContaining(expectedText);
  }
}

export default new ProductDetailsPage();
