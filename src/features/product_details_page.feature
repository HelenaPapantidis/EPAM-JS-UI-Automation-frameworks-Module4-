@pdp
Feature: Product details
  In order to make a purchase decision
  As a visitor
  I want to view detailed information about a product

  Background:
    Given the user is on the products page
    And the product catalog is loaded

  Scenario: View product details
    When the user selects "Pliers" from the product list
    Then the details for "Pliers" should be displayed
    And the product details page should display the following:
      | Name                     |
      | Tag                      |
      | Price                    |
      | Description              |
      | Quantity                 |
      | Add to cart button       |
      | Add to favourites button |


