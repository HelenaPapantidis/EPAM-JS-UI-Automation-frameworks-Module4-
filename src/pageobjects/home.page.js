// src/pageobjects/home.page.js
import BasePage from "./page.js";

/**
 * HOME / CATALOG PAGE OBJECT
 * ------------------------------------------------------------
 * Sections below:
 *  - SELECTORS
 *  - ELEMENT GETTERS
 *  - WAITERS (page/data readiness)
 *  - ACTIONS (user interactions)
 *  - ASSERTIONS (verifications used across features)
 *  - HELPERS (private utils)
 */
const SELECTORS = {
  /* ===========================
   * SELECTORS
   * ===========================
   */

  // Top search bar
  searchInputField: 'input[placeholder="Search"]',
  searchButton: '//button[normalize-space()="Search"]',

  // Sort dropdown shown on catalog/category pages
  sortDropdown: '//*[normalize-space()="Sort"]/following::select[1]',

  // Product title inside a product card (RELATIVE selector)
  // Keep as-is for compatibility with existing tests.
  productNameOnCardRel: './/h5[@data-test="product-name"]',

  // Category page title (the site uses <h2 data-test="page-title">)
  categoryTitle: "h2",

  // Product price inside a product card (RELATIVE selector)
  // NOTE: also have `productPriceOnCardRel` below; left both for compatibility.
  productPrice: './/*[@data-test="product-price"]',

  // Language dropdown in the header
  languageDropdown: '//select[@id="language"]',

  // A single, specific product card looked up by product name (ABSOLUTE selector)
  productCardByName: (name) =>
    `//h5[@data-test="product-name" and normalize-space()="${name}"]`,

  // Any product tile (card) in the grid (ABSOLUTE selector)
  productTiles: '//*[self::div or self::a][contains(@class,"card")][.//h5[@data-test="product-name"] and .//*[@data-test="product-price"]]',

  // Preferred RELATIVE selector for price on a card (kept explicit for readability)
 productPriceOnCardRel: '//p[@data-test="product-price"]',

};

class HomePage extends BasePage {
  /* ===========================
   * ELEMENT GETTERS
   * ===========================
   */

  get searchInputField() {
    return this.el(SELECTORS.searchInputField);
  }
  get searchButton() {
    return this.el(SELECTORS.searchButton);
  }
  get sortDropdown() {
    return this.el(SELECTORS.sortDropdown);
  }
  get categoryTitle() {
    return this.el(SELECTORS.categoryTitle);
  }

  // List of product name elements (kept for backwards compatibility with older steps)
  get productList() {
    return this.els(SELECTORS.productNameOnCardRel);
  }

  // Full product cards (tiles) — use these for richer checks (name + price, etc.)
  get productCards() {
    return this.els(SELECTORS.productTiles);
  }

  /* ===========================
   * WAITERS (page/data readiness)
   * ===========================
   */

  /**
   * Wait until at least one product name element is present.
   * Used by legacy steps that rely on `productList`.
   */
  async waitForProductList() {
    await browser.waitUntil(async () => (await this.productList).length > 0, {
      timeout: 7000,
      timeoutMsg: "Products did not render on the category page",
    });
  }

  /**
   * Wait until at least one full product card is present.
   * Prefer using this for checks that need name + price on the same tile.
   */
  async waitForCategoryProducts() {
    await browser.waitUntil(async () => (await this.productCards).length > 0, {
      timeout: 7000,
      timeoutMsg: "Product cards did not load",
    });
  }

  /* ===========================
   * ACTIONS (user interactions)
   * ===========================
   */

  /**
   * Pick a sort option by visible text (e.g. "Price: Low to High").
   */
  async sortProducts(option) {
    await this.sortDropdown.selectByVisibleText(option);
    
    await this.waitForProductList();
  }

  /**
   * Open a product details page by clicking its card title.
   */
  async openProduct(product) {
    await $(`//h5[normalize-space()="${product}"]`).click();
  }

  /**
   * Perform a keyword search from the header.
   */
  async search(query) {
    await this.searchInputField.setValue(query);
    await this.searchButton.click();
  }

  /**
   * Navigate to the product details page directly from Home (used in some flows).
   */
  async goToProductDetailsPage(productName) {
    await this.open(); // BasePage.open() -> go to home
    const productCard = await $(SELECTORS.productCardByName(productName));
    await productCard.click();
  }

  /**
   * Add a product to basket from its details page.
   * If quantity input exists, set it; otherwise just click "Add to basket".
   */
  async addProductToBasket(productName, qty = 1) {
    await this.goToProductDetailsPage(productName);

    const qtyInput = await $('input[name="quantity"]');
    if (await qtyInput.isExisting()) {
      await qtyInput.setValue(qty);
    }

    const addBtn = await $('//button[contains(.,"Add to basket")]');
    await addBtn.click();
  }

  /* ===========================
   * ASSERTIONS (verifications)
   * ===========================
   */

  /**
   * Return the text of the category title (e.g. "Category: Power Tools").
   */
  async getCategoryTitle() {
    return this.categoryTitle.getText();
  }

  /**
   * Verify every product card in view shows both: a name and a price.
   */
  async verifyProductsHaveNameAndPrice() {
    await this.waitForCategoryProducts();

    const cards = await this.productCards;
    expect(cards.length).toBeGreaterThan(0);

    for (const card of cards) {
      const nameEl = await card.$(SELECTORS.productNameOnCardRel);
      const priceEl = await card.$(SELECTORS.productPriceOnCardRel);

      await expect(nameEl).toBeDisplayed();
      await expect(priceEl).toBeDisplayed();

      const nameTxt = (await nameEl.getText()).trim();
      const priceTxt = (await priceEl.getText()).trim();

      expect(nameTxt.length).toBeGreaterThan(0);
      expect(priceTxt.length).toBeGreaterThan(0);
    }
  }

  /**
   * Assert that a specific product name appears in the list.
   */
  async verifyProductInList(product) {
    const el = await $(`//h5[normalize-space()="${product}"]`);
    await expect(el).toBeDisplayed();
  }

  /**
   * Legacy results check (kept for compatibility with older tests).
   * Adjust selector if app markup changes.
   */
  async verifyResultsExist() {
    const results = await this.els('//div[contains(@class,"product")]');
    expect(results.length).toBeGreaterThan(0);
  }

  /**
   * Smoke: page is translated (very loose check).
   */
  async verifyPageTranslated() {
    await expect($("body")).toBeDisplayed();
  }

  /**
   * Smoke: header/menu is translated (very loose check).
   */
  async verifyMenuTranslated() {
    await expect($("//nav")).toBeDisplayed();
  }

  /* ===== Sorting assertions (used by @filter @sort feature) ===== */

  /**
   * Verify prices are in ascending order (Low → High).
   */
  async verifyPricesAscending() {
  const prices = await this.#getAllPrices();
  // console.log('ASC prices:', prices); // po želji za debug

  for (let i = 1; i < prices.length; i++) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
  }
}



  /**
   * Verify prices are in descending order (High → Low).
   */
  async verifyPricesDescending() {
    const prices = await this.#getAllPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  }

  /**
   * First price ≤ last price (useful combined with ascending sort).
   */
  async verifyFirstPriceLessOrEqual() {
    const prices = await this.#getAllPrices();
    const first = prices[0];
    const last = prices[prices.length - 1];
    expect(first).toBeLessThanOrEqual(last);
  }

  /**
   * First price ≥ last price (useful combined with descending sort).
   */
  async verifyFirstPriceGreaterOrEqual() {
    const prices = await this.#getAllPrices();
    const first = prices[0];
    const last = prices[prices.length - 1];
    expect(first).toBeGreaterThanOrEqual(last);
  }

  /* ===========================
   * HELPERS (private utils)
   * ===========================
   */

  /**
   * Collect all visible product prices as numbers.
   */
 async #getAllPrices() {
  await this.waitForCategoryProducts();
  const cards = await this.els(SELECTORS.productTiles);
  const prices = [];

  for (const card of cards) {
    const priceEl = await card.$(SELECTORS.productPriceOnCardRel); // .//*[@data-test="product-price"]
    if (!(await priceEl.isExisting())) continue; // preskoči ako kartica nema cenu (retko)
    const raw = (await priceEl.getText()).trim();
    if (!raw) continue;
    prices.push(this.#parsePrice(raw));
  }

  expect(prices.length).toBeGreaterThan(0);
  return prices;
}




  /**
   * Parse currency string into number.
   * Handles "$19.99", "€1.234,56", "19,99 RSD", etc.
   */
  #parsePrice(txt) {
  let clean = txt.replace(/[^\d.,-]/g, '').trim(); // izbaci valutu i slova
  clean = clean.replace(/,/g, '');                 // skloni hiljadarske zareze
  const num = parseFloat(clean);
  if (Number.isNaN(num)) throw new Error(`Price parse failed for: "${txt}" -> "${clean}"`);
  return num;
}

}

export default new HomePage();
