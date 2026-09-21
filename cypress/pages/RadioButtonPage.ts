import { BasePage } from './BasePage'

const sel = {
  yesLabel: 'label[for="yesRadio"]',
  successText: '.text-success',
  noRadio: '#noRadio',
} as const

export class RadioButtonPage extends BasePage {
  protected path = '/radio-button'

  selectYes() {
    this.safeClick(sel.yesLabel)
  }

  expectYesSelected() {
    cy.get(sel.successText).should('contain', 'Yes')
    cy.get(sel.noRadio).should('be.disabled')
  }
}
