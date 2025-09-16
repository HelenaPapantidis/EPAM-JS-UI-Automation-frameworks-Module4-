import { Given, When, Then } from "@wdio/cucumber-framework";
import HomePage from "../pageobjects/home.page.js";
import ProductDetailsPage from "../pageobjects/productDetails.page.js";
import BasketPage from "../pageobjects/basket.page.js";
import NavPage from "../pageobjects/nav.page.js";

// --- Given ---
Given('the user is on the product details page for {string}', async (productName) => {
  await HomePage.goToProductDetailsPage(productName);
  await expect(ProductDetailsPage.productTitle).toHaveText(productName);
});

Given('the user adds {string} quantity to the basket', async (quantity) => {
  await ProductDetailsPage.setQuantity(quantity);
  await ProductDetailsPage.addToBasket();
});

// --- When ---
When('the user opens the basket page', async () => {
  await NavPage.openBasket();
  
});

When('the user removes {string} from the basket', async (productName) => {
  await BasketPage.removeProduct(productName);
});

// --- Then ---
Then("the basket page should display the message:", async (docString) => {
  await expect(BasketPage.emptyBasketMessage).toHaveText(docString.trim());
});

Then("no products should be listed in the basket", async () => {
  const products = await BasketPage.productList;
  expect(products).toHaveLength(0);
});
