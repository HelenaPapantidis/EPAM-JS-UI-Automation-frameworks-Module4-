@search
Feature: Search products
  In order to quickly find a specific product
  As a visitor
  I want to search the catalog by product name

  Background:
    Given the user is on the products page
    And the product catalog is loaded

  Scenario: Search an exact product by name
    When the user searches for "Hammer"
    Then the product list should include "Hammer"
    And each listed product should display a name and a price
    And the number of results should be greater than "0"

  