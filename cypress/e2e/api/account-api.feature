@api @smoke
Feature: Account API

  Scenario: User creation token and authorization
    Given a unique account api username and password
    When I create the user through the account api
    Then the account api user should be created
    When I generate an account api token
    Then the token response should be successful
    When I check account authorized with the correct password
    Then account authorized should be true
    When I check account authorized with password "WrongPass1!"
    Then account authorized should not be true
