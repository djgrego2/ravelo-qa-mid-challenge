import { BasePage } from './BasePage'

const sel = {
  alertButton: '#alertButton',
  confirmButton: '#confirmButton',
  confirmResult: '#confirmResult',
} as const

export class AlertsPage extends BasePage {
  protected path = '/alerts'

  triggerAlert() {
    this.safeClick(sel.alertButton)
  }

  triggerConfirm() {
    this.safeClick(sel.confirmButton)
  }

  expectConfirmResult(text: string) {
    cy.get(sel.confirmResult).should('contain', text)
  }
}
