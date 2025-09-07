import BasePage from "./page.js";

const SELECTORS = {
  // --- Search (left sidebar) ---
  searchInputField: 'input[placeholder="Search"]',
  searchButton: '//button[normalize-space()="Search"]',

  // --- Sort (above product grid) ---
  sortDropdown: '//*[normalize-space()="Sort"]/following::select[1]',

  // --- Product Grid (center area) ---

  productNameOnCard: '//h5[@data-test="product-name"]',
};

class HomePage extends BasePage {
  // ---------- Element getters (nouns) ----------
  get searchInputField() {
    return this.el(SELECTORS.searchInputField);
  }
  get searchButton() {
    return this.el(SELECTORS.searchButton);
  }
  get sortDropdown() {
    return this.el(SELECTORS.sortDropdown);
  }

  get productNamesOnCards() {
    return this.els(SELECTORS.productNameOnCard);
  }

  // ---------- Page actions ----------

  // Navigate to the landing page.
  async openHomePage() {
    await this.open("/");
  }
  // Navigate to product details page for a given product name
  async goToProductDetailsPage(productName) {
    await this.openHomePage(); // idi na home
    await this.clickProductCardByName(productName); // klik na karticu
  }
  //click on specific product card by its name
  async clickProductCardByName(productName) {
    const card = await $(
      `//h5[@data-test="product-name" and normalize-space()="${productName}"]`
    );
    await card.waitForExist({ timeout: 10000 });
    await card.scrollIntoView();
    await card.waitForClickable({ timeout: 5000 });
    await card.click();
  }

  // Perform a search using the sidebar search box.
  async searchFor(searchTerm) {
    await this.searchInputField.setValue(searchTerm);
    await this.searchButton.click();
  }

  // Select a category checkbox by its visible label (idempotent).
  async selectCategory(categoryLabel) {
    const checkbox = await this.el(
      SELECTORS.categoryCheckboxByLabel(categoryLabel)
    );
    if (!(await checkbox.isSelected())) {
      await checkbox.click();
    }
  }

  // Choose a sorting option by its visible text, e.g., "Price (Lowest)".
  async sortBy(optionText) {
    await this.sortDropdown.selectByVisibleText(optionText);
  }
}

export default new HomePage();
