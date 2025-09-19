import { Given, When, Then } from "@wdio/cucumber-framework";

Given("the user is on the homepage", async () => {
  await browser.url("/");
});

Given("the user is on the login page", async () => {
  await browser.url("/auth/login");
});



Then("the URL should contain {string}", async (part) => {
  await expect(browser).toHaveUrlContaining(part);
});

