@epam-home @smoke
Feature: EPAM Home Page
  As a visitor
  I want to open the EPAM corporate website
  So that I can verify it loads correctly with the expected title

  Scenario: EPAM homepage loads with the correct page title
    Given I navigate to the EPAM homepage
    Then the page title should be "EPAM | Software Engineering & Product Development Services"
