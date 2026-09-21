import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'
import { LoginPage } from '../../../pages/LoginPage'
import { TextBoxPage } from '../../../pages/TextBoxPage'

const login = new LoginPage()
const textBox = new TextBoxPage()

Given('I open the login page', () => {
  login.visit()
})

Given('I open the text box page', () => {
  textBox.visit()
})

Then('the login form should meet basic accessibility checks', () => {
  login.expectBasicAccessibility()
})

Then('the text box form should meet basic accessibility checks', () => {
  textBox.expectBasicAccessibility()
})
