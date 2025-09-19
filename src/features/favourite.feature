@favourites
Feature: Favourite products
  In order to save products for later
  As a signed-in user
  I want to add, view and remove products in my favourites list

  Background:
    Given the user is signed in

  Scenario: Remove a product from favourites
    Given the favourites list contains "Bolt Cutters"
    When the user removes "Bolt Cutters" from favourites
    Then the page should display the message:
      """
      There are no favorites yet. In order to add favorites, please go to the product listing and mark some products as your favorite.
      """
    And the favourites list should not display any products
