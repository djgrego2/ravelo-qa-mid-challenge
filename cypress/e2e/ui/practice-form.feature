@ui
Feature: Practice Form

  @smoke
  Scenario: Valid submission shows success modal
    Given practice form valid data from fixtures
    When I fill and submit the practice form with that data
    Then the success modal should contain the submitted name and email

  Scenario: Invalid email documents known defect
    Given practice form invalid email data from fixtures
    When I fill basic practice form fields and submit
    Then the invalid email outcome should be handled
