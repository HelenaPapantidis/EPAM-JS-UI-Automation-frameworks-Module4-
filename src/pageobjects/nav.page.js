// src/pageobjects/nav.page.js
import BasePage from "./page.js";

/**
 * Top navigation (header) – handles user menu and logout.
 * Keep selectors tolerant; prefer data-* if your app has them.
 */
const SELECTORS = {
  basketLink: '[data-test="nav-cart"]',
  basketBadge: '[data-test="cart-quantity"]',

  // When logged-in, the username / account toggle in the header.
  userMenuToggle: '[data-test*="user-menu"]',

  // Dropdown container (optional, used only for a quick check).
  userMenuDropdown: '[data-test="user-dropdown"]',

  // Logout item inside the dropdown.
  logoutLink: '[data-test="nav-logout"]',

  // When logged-out, the “Sign in” link in the header.
  signInLink: '[data-test="nav-signin"]',
};

class NavBar extends BasePage {
  // --- elements ---
  get basketLink() {
    return this.el(SELECTORS.basketLink);
  }
  get basketBadge() {
    return this.el(SELECTORS.basketBadge);
  }
  get userMenuToggle() {
    return this.el(SELECTORS.userMenuToggle);
  }
  get userMenuDropdown() {
    return this.el(SELECTORS.userMenuDropdown);
  }
  get logoutLink() {
    return this.el(SELECTORS.logoutLink);
  }
  get signInLink() {
    return this.el(SELECTORS.signInLink);
  }

  // --- actions ---
  async openUserMenu() {
    await this.userMenuToggle.click();
  }

  //--- basket----
  async expectBasketBadge(expectedQty) {
    await expect(this.basketBadge).toHaveText(expectedQty);
  }

  async openBasket() {
  // if navbar is collapsed, open it
  const toggler = await $('button.navbar-toggler');
  if (await toggler.isExisting() && await toggler.isDisplayed()) {
    const visible = await this.basketLink.isDisplayed().catch(() => false);
    if (!visible) await toggler.click();
  }
  await this.basketLink.waitForClickable({ timeout: 15000 });
  await this.basketLink.click();

}
//------categories dropdown menu------
 get categoriesMenu() {
    return $('//a[normalize-space()="Categories"]');
  }

  async openCategory(category) {
    await this.categoriesMenu.click(); // open categories dropdown
    await $(`//a[normalize-space()="${category}"]`).click(); // click on desired category
  }

}

export default new NavBar();
