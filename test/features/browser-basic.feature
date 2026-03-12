@browser-basic
Feature: Basic Browser Interaction Commands
  As a QA engineer
  I want to validate basic WebdriverIO browser commands
  So that element querying and interaction capabilities work correctly

  Background:
    Given I am on the login page

  @smoke
  Scenario: Submit button exists in the DOM
    Then the element "#submit" should exist in the DOM

  @smoke
  Scenario: Submit button is visible on screen
    Then the element "#submit" should be displayed

  @regression
  Scenario: Only one submit button is present on the page
    Then there should be exactly 1 elements matching "#submit"

  @regression
  Scenario: Clicking submit without credentials shows a validation error
    When I click the submit button
    Then I should see the error "Your username is invalid!"

  @regression
  Scenario: Setting field values via setValue triggers validation
    When I set the value of "#username" to "invalidUser"
    And I set the value of "#password" to "invalidPass"
    And I click the submit button
    Then I should see the error "Your username is invalid!"

  @regression
  Scenario: Appending field values via addValue triggers validation
    When I append the value "invalidUser" to "#username"
    And I append the value "invalidPass" to "#password"
    And I click the submit button
    Then I should see the error "Your username is invalid!"

  @regression
  Scenario: Waiting for submit button to be displayed
    Then I wait for "#submit" to be displayed within 5000ms

  @regression
  Scenario: Waiting for submit button to exist in the DOM
    Then I wait for "#submit" to exist within 5000ms
