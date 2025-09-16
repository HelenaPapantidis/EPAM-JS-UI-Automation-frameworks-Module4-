import BasePage from "./page.js";

class FavouritePage extends BasePage {
  get emptyMessage() {
    return $('//div[contains(@class,"alert")]');
  }

  async addToFavourites(product) {
    await $(`//h5[normalize-space()="${product}"]/following::button[contains(.,"Favourite")]`).click();
  }

  async removeFromFavourites(product) {
    await $(`//h5[normalize-space()="${product}"]/following::button[contains(.,"Remove")]`).click();
  }

  async expectNoProducts() {
    const products = await $$('//div[contains(@class,"product")]');
    expect(products.length).toBe(0);
  }
}

export default new FavouritePage();
