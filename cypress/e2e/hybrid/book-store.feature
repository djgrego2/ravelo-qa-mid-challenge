@hybrid
Feature: Book Store hybrid UI and API

  Background:
    Given a hybrid bookstore user was created via api with token

  @smoke
  Scenario: Login in UI after api user creation
    When I log in through the ui with that user
    Then the profile should show the logged in username

  Scenario: Book added via api appears on profile
    When I add the fixture sample book to that user via api
    And I log in through the ui with that user
    And I open the profile page
    Then the profile should list the sample book title

  Scenario: UI catalog matches api book list
    When I fetch all book titles from the api
    And I log in through the ui with that user
    And I open the bookstore page
    Then the ui catalog should list those titles
