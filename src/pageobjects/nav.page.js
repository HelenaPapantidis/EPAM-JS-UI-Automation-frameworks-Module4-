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

  async expectBasketBadge(expectedQty) {
    await expect(this.basketBadge).toHaveText(expectedQty);
  }

  async openBasket() {
    await this.basketLink.click();
  }
}

export default new NavBar();
