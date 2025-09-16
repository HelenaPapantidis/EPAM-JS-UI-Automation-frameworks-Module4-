import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page.js';

Given('the user is on the products page', async () => {
  await HomePage.open();                   
});

Given('the product catalog is loaded', async () => {
  await HomePage.waitForProductList();
});

When('the user sorts products by {string}', async (option) => {
  await HomePage.sortProducts(option);     
});

Then('product prices should be ordered from lowest to highest', async () => {
  await HomePage.verifyPricesAscending();
});

