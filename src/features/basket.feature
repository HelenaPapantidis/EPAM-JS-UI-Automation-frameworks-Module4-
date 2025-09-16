Feature: Basket
  In order to buy products
  As a customer
  I want to add items to the basket, review them, update quantities, proceed to checkout, and remove them

  @remove
Scenario: Remove the last item from the basket
  Given the user is on the product details page for "Pliers"
  And the user adds "1" quantity to the basket
  When the user opens the basket page
  And the user removes "Pliers" from the basket
  Then the basket page should display the message:
    """
    The cart is empty. Nothing to display.
    """
  And no products should be listed in the basket
