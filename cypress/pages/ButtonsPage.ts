import { BasePage } from './BasePage'

const sel = {
  doubleClickBtn: '#doubleClickBtn',
  doubleClickMessage: '#doubleClickMessage',
} as const

export class ButtonsPage extends BasePage {
  protected path = '/buttons'

  doubleClick() {
    cy.get(sel.doubleClickBtn).dblclick()
  }

  expectDoubleClickMessage(text: string) {
    cy.get(sel.doubleClickMessage).should('contain', text)
  }
}
