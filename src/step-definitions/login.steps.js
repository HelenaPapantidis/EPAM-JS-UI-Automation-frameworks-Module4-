console.log('LOGIN.STEPS.JS LOADED!')

import { Given, When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import AccountPage from '../pageobjects/account.page.js'

// ---------- Background ----------
Given('the user is on the login page', async () => {
  await LoginPage.openLoginPage()
})

// ---------- When steps ----------
When('the user enters email {string}', async (email) => {
  await LoginPage.typeEmail(email)
})

When('the user enters password {string}', async (password) => {
  await LoginPage.typePassword(password)
})

When('the user clicks the "Login" button', async () => {
  await LoginPage.clickLogin()
})

// ---------- Then steps ----------
Then('the user should be redirected to the My account page', async () => {
  await AccountPage.waitForLoaded()
})

Then('the page title should display {string}', async (expectedTitle) => {
  await expect(AccountPage.pageTitle).toHaveText(expectedTitle)
})

Then('the user should see the error message {string}', async (expectedMessage) => {
  let actualMessage = ''

  if (expectedMessage.includes('Email')) {
    actualMessage = await LoginPage.emailError.getText()
  } else if (expectedMessage.includes('Password')) {
    actualMessage = await LoginPage.passwordError.getText()
  }

  expect(actualMessage).toEqual(expectedMessage)
})

Then('the user should see the following error messages:', async (dataTable) => {
  const expectedMessages = dataTable.raw().map(row => row[0]) 
  const actualMessages = []
  if (await LoginPage.emailError.isExisting()) {
    actualMessages.push(await LoginPage.emailError.getText())
  }
  if (await LoginPage.passwordError.isExisting()) {
    actualMessages.push(await LoginPage.passwordError.getText())
  }
  expect(actualMessages).toEqual(expectedMessages)
})

Then('the user should remain on the login page', async () => {
  await LoginPage.expectOnLoginPage()
})
