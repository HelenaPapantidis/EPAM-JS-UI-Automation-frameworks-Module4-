import { Given, When, Then } from '@wdio/cucumber-framework';
import FavouritePage from '../pageobjects/favourite.page.js';

Given('the favourites list contains {string}', async (product) => {
    await FavouritePage.addToFavourites(product);
});

When('the user removes {string} from favourites', async (product) => {
    await FavouritePage.removeFromFavourites(product);
});

Then('the page should display the message:', async (docString) => {
    await expect(FavouritePage.emptyMessage).toHaveText(docString.trim());
});

Then('the favourites list should not display any products', async () => {
    await FavouritePage.expectNoProducts();
});
