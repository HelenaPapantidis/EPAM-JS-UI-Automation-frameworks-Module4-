@basket
Feature: Basket
  In order to buy products
  As a customer
  I want to add items to the basket, review them, update quantities, proceed to checkout, and remove them

  Background:
    Given the user is on the product details page for "Pliers"

  @add
  Scenario: Add a product to the basket from PDP
    When the user adds the product "Pliers" to the basket
    Then a confirmation message "Product added to shopping cart." should be displayed
    And the basket badge should increase by "1"
    


  @remove
  Scenario: Remove the last item from the basket
    Given the basket contains "Pliers" with quantity "1"
    And the user is on the basket page
    When the user removes "Pliers" from the basket
    Then the basket page should display the message:
      """
      The basket is empty. Nothing to display.
      """
    And no products should be listed in the basket