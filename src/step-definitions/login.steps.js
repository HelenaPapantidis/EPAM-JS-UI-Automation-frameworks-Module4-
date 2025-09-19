// src/step-definitions/login.steps.js
import { Given, When, Then } from '@wdio/cucumber-framework'
import LoginPage from '../pageobjects/login.page.js'
import { expect } from '@wdio/globals'



// --- Actions ---
When('the user enters email {string}', async (email) => {
  await LoginPage.typeEmail(email)
})

When('the user enters password {string}', async (password) => {
  await LoginPage.typePassword(password)
})

When('the user clicks the "Login" button', async () => {
  await LoginPage.clickLogin()
})

// --- Assertions ---
Then('the user should see the error message {string}', async (expectedMsg) => {
  const errors = []

  if (await LoginPage.emailError.isDisplayed()) {
    errors.push(await LoginPage.getEmailErrorText())
  }
  if (await LoginPage.passwordError.isDisplayed()) {
    errors.push(await LoginPage.getPasswordErrorText())
  }
  if (await LoginPage.formError.isDisplayed()) {
    errors.push(await LoginPage.getFormErrorText())
  }

  await expect(errors).toContain(expectedMsg)
})

Then('the user should see the following error messages:', async (dataTable) => {
  const expectedMessages = dataTable.raw().flat()

  const actualMessages = []
  if (await LoginPage.emailError.isDisplayed()) {
    actualMessages.push(await LoginPage.getEmailErrorText())
  }
  if (await LoginPage.passwordError.isDisplayed()) {
    actualMessages.push(await LoginPage.getPasswordErrorText())
  }
  if (await LoginPage.formError.isDisplayed()) {
    actualMessages.push(await LoginPage.getFormErrorText())
  }

  await expect(actualMessages).toEqual(expectedMessages)
})

Then('the user should remain on the login page', async () => {
  await LoginPage.expectOnLoginPage()
})
