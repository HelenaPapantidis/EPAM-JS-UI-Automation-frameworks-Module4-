// src/pageobjects/basket.page.js
import BasePage from "./page.js";

const TableProduct = {
  rowByName: (name) => `//tr[.//td[contains(normalize-space(),"${name}")]]`,

  removeBtnInRow: `.btn.btn-danger`,

  qtyInputInRow: `.//input[@data-test="quantity"]`,

  emptyMsg: `p[class='ng-star-inserted']`,

  rows: "table tbody tr",
};

class BasketPage extends BasePage {
  get basketTitle() {
    return $(TableProduct.title);
  }
  get emptyBasketMessage() {
    return $(TableProduct.emptyMsg);
  }

  get productList() {
    return $$(TableProduct.rows);
  }

  row(name) {
    return $(TableProduct.rowByName(name));
  }

  async removeProduct(name) {
    const row = await this.row(name);
    await row.waitForExist({
      timeout: 7000,
      timeoutMsg: `Row for "${name}" not found`,
    });

    const removeBtn = await row.$(TableProduct.removeBtnInRow);
    await removeBtn.scrollIntoView();
    await removeBtn.waitForClickable({ timeout: 10000 });
    await removeBtn.click();

    // čekaj da red nestane ili da se pojavi empty poruka
    await browser.waitUntil(
      async () =>
        !(await row.isExisting()) ||
        (await this.emptyBasketMessage.isDisplayed()),
      { timeout: 7000, timeoutMsg: `Item "${name}" wasn't removed` }
    );
  }

  async getProductQuantity(name) {
    const row = await this.row(name);
    const input = await row.$(TableProduct.qtyInputInRow);
    await input.waitForDisplayed({ timeout: 5000 });
    return Number(await input.getValue());
  }

  async setProductQuantity(name, qty) {
    const row = await this.row(name);
    const input = await row.$(TableProduct.qtyInputInRow);
    await input.waitForDisplayed({ timeout: 5000 });
    await input.setValue(String(qty));
  }

  async open() {
    await super.open("/checkout");
  }
}

export default new BasketPage();
