@browser-advanced
Feature: Advanced Browser Commands
  As a QA engineer
  I want to validate advanced WebdriverIO browser commands
  So that JavaScript execution, cookies, and DOM inspection work correctly

  @regression
  Scenario: Execute synchronous JavaScript in browser context
    Given I navigate to the base URL
    Then the page title retrieved via JavaScript should not be empty

  @regression
  Scenario: Execute asynchronous JavaScript in browser context
    Given I navigate to the base URL
    Then the page title retrieved via async JavaScript should not be empty

  @regression
  Scenario: Wait using a custom waitUntil condition
    Given I am on the login page
    Then I can wait until "#submit" is displayed using waitUntil

  @regression
  Scenario: Set and retrieve a browser cookie
    Given I am on the login page
    When I set a cookie named "testCookie" with value "testValue"
    Then the cookie "testCookie" should have value "testValue"

  @regression
  Scenario: Retrieve multiple browser cookies
    Given I am on the login page
    When I set a cookie named "cookieOne" with value "valueOne"
    And I set a cookie named "cookieTwo" with value "valueTwo"
    Then there should be at least 1 cookies in the browser

  @regression
  Scenario: Delete a browser cookie
    Given I am on the login page
    When I set a cookie named "cookieToDelete" with value "someValue"
    And I delete the cookie "cookieToDelete"
    Then the cookie "cookieToDelete" should not exist

  @regression
  Scenario: Get an element attribute value
    Given I am on the login page
    Then the attribute "type" of element "#username" should equal "text"

  @regression
  Scenario: Get an element property value after input
    Given I am on the login page
    When I set the value of "#username" to "testUser"
    Then the property "value" of element "#username" should equal "testUser"
