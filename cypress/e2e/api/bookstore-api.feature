@api
Feature: BookStore API

  Background:
    Given bookstore sample data is loaded from fixtures
    And a bookstore api test user exists with token

  @smoke
  Scenario: List catalog books
    When I request all books from the api
    Then the books list should not be empty

  Scenario: Get book by ISBN
    When I request the sample book by ISBN
    Then the book response should match the sample title and ISBN

  Scenario: Missing ISBN fails
    When I request a book with empty ISBN
    Then the book response status should not be success

  Scenario: Add and remove book from user collection
    When I add the sample book to the user collection
    Then adding the book should succeed
    When I remove the sample book from the user collection
    Then removing the book should return no content
