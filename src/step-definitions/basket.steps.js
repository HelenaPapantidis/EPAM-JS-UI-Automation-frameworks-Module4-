// src/step-definitions/basket.steps.js
import { Given, When, Then } from '@wdio/cucumber-framework'
import HomePage from '../pageobjects/home.page.js'
import ProductDetailsPage from '../pageobjects/productDetails.page.js'
import BasketPage from '../pageobjects/basket.page.js'
import NavPage from '../pageobjects/nav.page.js'

// ---------- Background ----------
Given('the user is on the product details page for {string}', async (productName) => {
  await HomePage.goToProductDetailsPage(productName)
  await ProductDetailsPage.expectProductName(productName)
})

// ---------- @add ----------
When('the user adds the product {string} to the basket', async (productName) => {
  await ProductDetailsPage.addToCart()
})

Then('a confirmation message {string} should be displayed', async (msg) => {
  await ProductDetailsPage.expectConfirmationMessage(msg)
})

Then('the basket badge should increase by {string}', async (expectedQty) => {
  await NavPage.expectBasketBadge(expectedQty)
})


// ---------- @remove ----------
Given('the cart contains {string} with quantity {string}', async (productName, qty) => {
  await ProductDetailsPage.addToCart()
  await NavPage.expectBasketBadge(expectedQty)
  
})

Given('the user is on the cart page', async () => {
  await NavPage.openCart()
})

When('the user removes {string} from the cart', async (productName) => {
  await BasketPage.removeProduct(productName)
})

Then('the cart page should display the message:', async (docString) => {
  const expectedMsg = docString.trim()
  await BasketPage.expectEmptyCartMessage(expectedMsg)
})

Then('no products should be listed in the cart', async () => {
  await BasketPage.expectBasketEmpty()
})
