// src/pageobjects/basket.page.js
import BasePage from "./page.js";

const SELECTORS = {
  emptyMessage: 'p[class="ng-star-inserted"]',
  cartItemRow: "table.table tbody tr",
  removeButtonByName: (name) =>
  `//tr[.//span[@data-test="product-title" and normalize-space()="${name}"]]//a[contains(@class,"btn-danger")]`

};

class BasketPage extends BasePage {
  async removeProduct(productName) {
    const removeBtn = await $(SELECTORS.removeButton(productName));
    await removeBtn.click();
  }

  get emptyCartMsg() {
    return $(SELECTORS.emptyCartMsg);
  }

  async expectEmptyCartMessage(expectedMsg) {
    const msg = await $(SELECTORS.emptyMessage);
    await expect(msg).toBeDisplayed();
    await expect(msg).toHaveTextContaining(expectedMsg);
  }
  async expectBasketEmpty() {
    const rows = await $$(SELECTORS.cartItemRow);
    // kad je prazno, ili nema tbody/tr ili se prikazuje samo poruka
    expect(rows.length).toBe(0);
  }
}

export default new BasketPage();
