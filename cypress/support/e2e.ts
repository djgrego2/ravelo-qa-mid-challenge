import './commands'
import 'cypress-mochawesome-reporter/register'
import { isIgnoredDemoQAException } from './demoqa-exceptions'

Cypress.on('uncaught:exception', (err) => {
  if (isIgnoredDemoQAException(err.message)) {
    return false
  }
  return true
})
