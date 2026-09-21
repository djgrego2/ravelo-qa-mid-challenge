@ui @accessibility
Feature: Accessibility smoke

  Scenario: Login form basics
    Given I open the login page
    Then the login form should meet basic accessibility checks

  Scenario: Text box form basics
    Given I open the text box page
    Then the text box form should meet basic accessibility checks
