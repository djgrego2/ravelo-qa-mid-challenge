import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { ButtonsPage } from '../../../pages/ButtonsPage'
import { RadioButtonPage } from '../../../pages/RadioButtonPage'

const buttons = new ButtonsPage()
const radio = new RadioButtonPage()

Given('I open the buttons page', () => {
  buttons.visit()
})

Given('I open the radio button page', () => {
  radio.visit()
})

When('I double click the button', () => {
  buttons.doubleClick()
})

When('I select radio Yes', () => {
  radio.selectYes()
})

Then('the double click message should be {string}', (message: string) => {
  buttons.expectDoubleClickMessage(message)
})

Then('radio Yes should be selected', () => {
  radio.expectYesSelected()
})
