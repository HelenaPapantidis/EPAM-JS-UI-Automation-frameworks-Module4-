import { When, Then } from '@wdio/cucumber-framework';
import NavPage from '../pageobjects/nav.page.js';
import HomePage from '../pageobjects/home.page.js';

When('the user opens the {string} category', async (category) => {
    await NavPage.openCategory(category);
});

Then('the category title should display {string}', async (title) => {
    await expect(HomePage.categoryTitle).toHaveText(title);
});

Then('the product list should not be empty', async () => {
  await HomePage.waitForProductList();
  const products = await HomePage.productList;
  expect(products.length).toBeGreaterThan(0);
});

Then('each listed product should display name and price', async () => {
    await HomePage.verifyProductsHaveNameAndPrice();
});
