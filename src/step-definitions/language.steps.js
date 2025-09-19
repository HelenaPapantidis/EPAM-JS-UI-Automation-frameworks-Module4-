import { When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page.js';

When('the user selects {string} from the language dropdown', async (language) => {
    await HomePage.changeLanguage(language);
});

Then('the page content should be displayed in the selected language', async () => {
    await HomePage.verifyPageTranslated();
});

Then('the main navigation menu should be translated accordingly', async () => {
    await HomePage.verifyMenuTranslated();
});
