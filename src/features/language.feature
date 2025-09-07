@language
Feature: Language selection
  In order to use the application in my preferred language
  As a visitor
  I want to change the site language from the language selector

  Background:
    Given the user is on the products page

  Scenario Outline: User changes the site language
    When the user selects "<language>" from the language dropdown
    Then the page content should be displayed in the selected language
    And the main navigation menu should be translated accordingly

    Examples:
      | language |
      | DE       |
      | EN       |
      | ES       |
      | FR       |
      | NL       |
      | TR       |




