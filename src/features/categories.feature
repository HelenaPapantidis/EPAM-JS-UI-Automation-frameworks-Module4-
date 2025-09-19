@catalog @categories
Feature: Browse by categories
  In order to find products by type
  As a visitor
  I want to open product categories from the header menu

  Background:
    Given the user is on the homepage

  Scenario: Open the "Power Tools" category from the header
    When the user opens the "Power Tools" category
    Then the category title should display "Category: Power Tools"
    And the product list should not be empty
    And each listed product should display a name and a price
