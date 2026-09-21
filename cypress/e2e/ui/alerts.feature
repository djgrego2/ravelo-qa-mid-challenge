@ui @smoke
Feature: Alerts

  Scenario: Native alert shows expected message
    Given the next browser alert is expected to say "You clicked a button"
    And I open the alerts page
    When I trigger the alert button

  Scenario: Confirm dialog accepts Ok
    Given confirm dialogs will be accepted
    And I open the alerts page
    When I trigger the confirm button
    Then the confirm result should contain "You selected Ok"

  Scenario: Confirm dialog dismisses with Cancel
    Given confirm dialogs will be dismissed
    And I open the alerts page
    When I trigger the confirm button
    Then the confirm result should contain "You selected Cancel"
