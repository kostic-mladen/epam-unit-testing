@login
Feature: Login Page
  As a user
  I want to log in to the practice test automation site
  So that I can verify login validation works correctly

  @smoke
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "student" and password "Password123"
    And I click the submit button
    Then the page title should be "Logged In Successfully | Practice Test Automation"

  @regression @negative
  Scenario: Login fails with invalid username
    Given I am on the login page
    When I enter username "invalidUser" and password "Password123"
    And I click the submit button
    Then I should see the error "Your username is invalid!"

  @regression @negative
  Scenario: Login fails with invalid password
    Given I am on the login page
    When I enter username "student" and password "wrongPassword"
    And I click the submit button
    Then I should see the error "Your password is invalid!"
