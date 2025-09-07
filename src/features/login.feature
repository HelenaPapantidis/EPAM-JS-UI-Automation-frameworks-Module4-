Feature: Login
  In order to access a personal account
  As a registered user
  I want to sign in securely

  Background:
    Given the user is on the login page

  @login @positive @smoke
  Scenario: Successful login with valid credentials
    When the user enters email "helena83p@yahoo.com"
    And the user enters password "ValidPass@123"
    And the user clicks the "Login" button
    Then the user should be redirected to the My account page
    And the page title should display "My account"

  @login @negative @required
  Scenario Outline: Login fails when required field is empty
    When the user enters email "<email>"
    And the user enters password "<password>"
    And the user clicks the "Login" button
    Then the user should see the error message "<error_message>"
    And the user should remain on the login page

    Examples:
      | email            | password    | error_message        |
      |                  | SomePass123 | Email is required    |
      | qa.user@test.com |             | Password is required |

  @login @negative @required
  Scenario: Login fails when both fields are empty (two messages)
    When the user clicks the "Login" button
    Then the user should see the following error messages:
      | Email is required    |
      | Password is required |
    And the user should remain on the login page

  @login @negative @format
  Scenario Outline: Login fails with invalid email format
    When the user enters email "<invalid_email>"
    And the user enters password "Test@Password2"
    And the user clicks the "Login" button
    Then the user should see the error message "Email format is invalid"
    And the user should remain on the login page

    Examples:
      | invalid_email    |
      | invalid.email    |
      | name@            |
      | @domain.com      |
      | name@domain..com |
      | name@domain,com  |
      | name domain@com  |
