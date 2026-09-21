import { After, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { expectAliasBodyRoot } from '../../../support/api/http-assertions'
import { checkAuthorized, createUser, deleteUser, generateToken } from '../../../support/api/account'

let username: string
let password: string
let userId: string
let token: string

Given('a unique account api username and password', () => {
  username = `api_user_${Date.now()}`
  password = 'Test1234!'
})

When('I create the user through the account api', () => {
  createUser(username, password).then((body) => {
    userId = body.userID
    expect(body.username).to.eq(username)
    expect(body.books).to.be.an('array')
  })
})

Then('the account api user should be created', () => {
  cy.wrap(userId).should('be.a', 'string').and('not.be.empty')
})

When('I generate an account api token', () => {
  generateToken(username, password).then((body) => {
    token = body.token
  })
})

Then('the token response should be successful', () => {
  cy.wrap(null).then(() => {
    expect(token).to.be.a('string')
    expect(token.length).to.be.greaterThan(0)
  })
})

When('I check account authorized with the correct password', () => {
  checkAuthorized(username, password).as('authOk')
})

When('I check account authorized with password {string}', (wrong: string) => {
  checkAuthorized(username, wrong).as('authBad')
})

Then('account authorized should be true', () => {
  expectAliasBodyRoot('@authOk', true)
})

Then('account authorized should not be true', () => {
  cy.get('@authBad').its('body').should('not.eq', true)
})

After(() => {
  if (userId && token) {
    deleteUser(userId, token)
  }
})
