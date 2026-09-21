@ui
Feature: Buttons and Radio

  @smoke
  Scenario: Double click shows message
    Given I open the buttons page
    When I double click the button
    Then the double click message should be "You have done a double click"

  Scenario: Radio Yes is selected
    Given I open the radio button page
    When I select radio Yes
    Then radio Yes should be selected
