import { expectDemoQaLabeledInput, expectPlaceholder } from '../support/accessibility'
import { BasePage } from './BasePage'

const sel = {
  userName: '#userName',
  userEmail: '#userEmail',
  currentAddress: '#currentAddress',
  permanentAddress: '#permanentAddress',
  submit: '#submit',
  output: '#output',
} as const

export class TextBoxPage extends BasePage {
  protected path = '/text-box'

  fillForm(data: {
    name: string
    email: string
    currentAddress: string
    permanentAddress: string
  }) {
    this.safeType(sel.userName, data.name)
    this.safeType(sel.userEmail, data.email)
    this.safeType(sel.currentAddress, data.currentAddress)
    this.safeType(sel.permanentAddress, data.permanentAddress)
  }

  submit() {
    this.safeClick(sel.submit)
  }

  fillSubmitAndExpect(data: {
    name: string
    email: string
    currentAddress: string
    permanentAddress: string
  }) {
    this.visit()
    this.fillForm(data)
    this.submit()
    this.expectOutput(data)
  }

  expectOutput(data: {
    name: string
    email: string
    currentAddress: string
    permanentAddress: string
  }) {
    cy.get(sel.output).should('contain', data.name)
    cy.get(sel.output).should('contain', data.email)
    cy.get(sel.output).should('contain', data.currentAddress)
    cy.get(sel.output).should('contain', data.permanentAddress)
  }

  expectBasicAccessibility() {
    expectDemoQaLabeledInput('userName')
    expectDemoQaLabeledInput('userEmail')
    expectDemoQaLabeledInput('currentAddress')
    expectDemoQaLabeledInput('permanentAddress')
    expectPlaceholder(sel.userName, 'Full Name')
    expectPlaceholder(sel.userEmail, 'name@example.com')
    cy.get(sel.submit).should('be.visible')
  }
}
