import { When } from '@badeball/cypress-cucumber-preprocessor'
import { TextBoxPage } from '../../../pages/TextBoxPage'

const textBox = new TextBoxPage()

type TextBoxData = {
  name: string
  email: string
  currentAddress: string
  permanentAddress: string
}

When('I submit each text box fixture case with matching output', () => {
  cy.fixture('text-box').then((fixture) => {
    cy.wrap(fixture.cases as TextBoxData[]).each((data: TextBoxData) => {
      textBox.fillSubmitAndExpect(data)
    })
  })
})
