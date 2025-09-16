@filter @sort
Feature: Filter and sort products
  In order to easily find what I'm looking for
  As a visitor
  I want to filter and sort products in the catalog

  Background:
    Given the user is on the products page
    And the product catalog is loaded

  Scenario: Sort products by price ascending
    When the user sorts products by "Price (Low - High)"
    Then product prices should be ordered from lowest to highest
   

 
 