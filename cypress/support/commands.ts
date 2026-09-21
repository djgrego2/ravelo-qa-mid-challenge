// custom commands hooked up from e2e.ts
import { LoginPage } from '../pages/LoginPage'
import { createUser } from './api/account'

declare global {
  namespace Cypress {
    interface Chainable {
      dismissAds(): Chainable<void>
      demoqaLogin(username: string, password: string): Chainable<void>
      createDemoQAUser(
        prefix?: string,
      ): Chainable<{ userId: string; username: string; password: string }>
    }
  }
}

// sticky footer ad blocks clicks sometimes
Cypress.Commands.add('dismissAds', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#fixedban').length) {
      cy.get('#fixedban').invoke('remove')
    }
    if ($body.find('#adplus-anchor').length) {
      cy.get('#adplus-anchor').invoke('remove')
    }
  })
})

Cypress.Commands.add('demoqaLogin', (username: string, password: string) => {
  new LoginPage().login(username, password)
})

// unique name so we don't pile up users on their api
Cypress.Commands.add('createDemoQAUser', (prefix = 'qa_auto') => {
  const username = `${prefix}_${Date.now()}`
  const password = 'Test1234!' // demoqa password rules

  return createUser(username, password).then((user) => ({
    userId: user.userID,
    username,
    password,
  }))
})
