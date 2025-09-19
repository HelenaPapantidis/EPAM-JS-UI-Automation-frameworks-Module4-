// src/pageobjects/account.page.js
import BasePage from "./page.js";

/**
 * "My Account" page object.
 *
 */
const SELECTORS = {
  pageTitle: '[data-test="page-title"]',
  profileLink: '[data-test="nav-profile"]',
  favoritesLink: '[data-test="nav-favorites"]',
  logoutButton: 'button[data-test="logout"]',
};

class AccountPage extends BasePage {
  // Open the account page directly 
  async openAccountPage() {
    await this.open("/account");
  }

  // ---- elements (nouns)
  get pageTitle() {
    return this.el(SELECTORS.pageTitle);
  }
  get profileLink() {
    return this.el(SELECTORS.profileLink);
  }
  get ordersLink() {
    return this.el(SELECTORS.ordersLink);
  }
  get favoritesLink() {
    return this.el(SELECTORS.favoritesLink);
  }
  // ---- actions (verbs)

  async pageTitleText () {
    return this.pageTitle.getText();
  }

  
  
  }

  


export default new AccountPage();
