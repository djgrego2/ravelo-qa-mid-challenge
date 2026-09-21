import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { AlertsPage } from '../../../pages/AlertsPage'

const alerts = new AlertsPage()

Given('the next browser alert is expected to say {string}', (message: string) => {
  cy.on('window:alert', (text) => {
    expect(text).to.eq(message)
  })
})

Given('confirm dialogs will be accepted', () => {
  cy.on('window:confirm', () => true)
})

Given('confirm dialogs will be dismissed', () => {
  cy.on('window:confirm', () => false)
})

Given('I open the alerts page', () => {
  alerts.visit()
})

When('I trigger the alert button', () => {
  alerts.triggerAlert()
})

When('I trigger the confirm button', () => {
  alerts.triggerConfirm()
})

Then('the confirm result should contain {string}', (text: string) => {
  alerts.expectConfirmResult(text)
})
