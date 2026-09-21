import { expectDemoQaLabeledInput, expectInputType, expectPlaceholder } from '../support/accessibility'
import { BasePage } from './BasePage'

const sel = {
  userName: '#userName',
  password: '#password',
  login: '#login',
  userNameValue: '#userName-value',
} as const

export class LoginPage extends BasePage {
  protected path = '/login'

  login(username: string, password: string) {
    this.visit()
    cy.get(sel.userName).clear().type(username)
    cy.get(sel.password).clear().type(password)
    this.safeClick(sel.login)
    cy.url().should('not.include', '/login')
  }

  expectLoggedInAs(username: string) {
    cy.get(sel.userNameValue).should('contain', username)
  }

  expectBasicAccessibility() {
    expectDemoQaLabeledInput('userName')
    expectDemoQaLabeledInput('password')
    expectPlaceholder(sel.userName, 'UserName')
    expectPlaceholder(sel.password, 'Password')
    expectInputType(sel.password, 'password')
    cy.get(sel.login).should('be.visible')
  }
}
