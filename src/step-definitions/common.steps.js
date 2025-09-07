import { Given, When, Then } from '@wdio/cucumber-framework';

Given('the user is on the homepage', async () => {
  await browser.url('/'); // koristi baseUrl iz wdio.conf.js
});

Given('the user is on the login page', async () => {
  // ako je kod tebe /auth/login – promeni
  await browser.url('/auth/login');
});

When('the user clicks the {string} button', async (label) => {
  await $(`//button[normalize-space()="${label}"] | //a[normalize-space()="${label}"]`).click();
});

Then('the URL should contain {string}', async (part) => {
  await expect(browser).toHaveUrlContaining(part);
});

Then('the error message {string} should be visible', async (text) => {
  await expect($(`//*[contains(text(),"${text}")]`)).toBeDisplayed();
});
