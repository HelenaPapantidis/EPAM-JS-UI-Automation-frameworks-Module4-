import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page.js';

When('the user searches for {string}', async (query) => {
    await HomePage.search(query);
});

Then('the product list should include {string}', async (product) => {
    await HomePage.verifyProductInList(product);
});

Then('each listed product should display a name and a price', async () => {
    await HomePage.verifyProductsHaveNameAndPrice();
});

Then('the number of results should be greater than {string}', async (count) => {
    await HomePage.verifyResultsGreaterThan(count);
});
