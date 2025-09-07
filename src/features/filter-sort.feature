@filter @sort
Feature: Filter and sort products
  In order to easily find what I'm looking for
  As a visitor
  I want to filter and sort products in the catalog

  Background:
    Given the user is on the products page
    And the product catalog is loaded

  Scenario: Filter products by category
    When the user filters products by "Power Tools"
    Then the products should only belong to the "Power Tools" category
    And each listed product should display a name and price

  Scenario: Sort products by price ascending
    When the user sorts products by "Price: Low to High"
    Then product prices should be ordered from lowest to highest
    And the first item price should be less than or equal to the last item price

  Scenario: Sort products by price descending
    When the user sorts products by "Price: High to Low"
    Then product prices should be ordered from highest to lowest
    And the first item price should be greater than or equal to the last item price

  Scenario Outline: Filter by category and price range
    When the user filters products by "Hand Tools"
    And the user sets the price range from <minPrice> to <maxPrice>
    Then all products should have a price between <minPrice> and <maxPrice>
    And the products should only belong to the "Hand Tools" category
    And product prices should be ordered from lowest to highest

    Examples:
      | minPrice | maxPrice |
      | 0        | 400      |
      | 400      | 800      |