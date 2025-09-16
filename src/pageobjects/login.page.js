// src/pageobjects/login.page.js
import BasePage from "./page.js";

/**
 * Centralize selectors in a constant.
 * Prefer stable data-test attributes.
 */
const SELECTORS = {
  emailInput: 'input[data-test="email"]',
  passwordInput: 'input[data-test="password"]',
  loginButton: '[data-test="login-submit"]',

  // specific field errors (under each input)
  emailError: '[data-test="email-error"]',
  passwordError: '[data-test="password-error"]',

  // optional global form error (e.g., wrong credentials)
  formError: '[data-test="login-error"]',
};

class LoginPage extends BasePage {
  async openLoginPage() {
    await this.open('auth/login');
  } 

  // inputs/buttons
  get emailInput() {
    return this.el(SELECTORS.emailInput);
  }
  get passwordInput() {
    return this.el(SELECTORS.passwordInput);
  }
  get loginButton() {
    return this.el(SELECTORS.loginButton);
  }

  // errors
  get emailError() {
    return this.el(SELECTORS.emailError);
  }
  get passwordError() {
    return this.el(SELECTORS.passwordError);
  }
  get formError() {
    return this.el(SELECTORS.formError);
  }
//method to interact with page
  async typeEmail(email) {
    await this.emailInput.setValue(email);
  }
  async typePassword(password) {
    await this.passwordInput.setValue(password);
  }
  async clickLogin() {
    // PROVERENO rešenje
    const btn = await this.loginButton;
    await btn.waitForDisplayed({ timeout: 5000 });

    // nekad pomogne scroll
    await btn.scrollIntoView();

    // klik na submit
    await btn.click();

    // fallback – ako klik ne submituje
    if (!(await browser.getUrl()).includes('/account')) {
      await browser.keys('Enter');
    }
  }

 async getEmailErrorText() {
    return await this.emailError.getText()
  }

  async getPasswordErrorText() {
    return await this.passwordError.getText()
  }

  async getFormErrorText() {
    return await this.formError.getText()
  }

   async expectOnLoginPage() {
    await expect(browser).toHaveUrl('https://practicesoftwaretesting.com/auth/login')
}
}
export default new LoginPage();
