export abstract class BasePage {
  protected abstract path: string

  visit() {
    cy.visit(this.path)
    cy.dismissAds()
  }

  /** Prefer visibility + scroll over force; dismiss ads first */
  protected safeClick(selector: string, options?: Partial<Cypress.ClickOptions>) {
    cy.dismissAds()
    cy.get(selector).scrollIntoView().should('be.visible').click(options)
  }

  protected safeCheck(selector: string, options?: Partial<{ force: boolean }>) {
    cy.dismissAds()
    cy.get(selector).scrollIntoView().check(options)
  }

  protected safeType(selector: string, text: string) {
    cy.dismissAds()
    cy.get(selector).scrollIntoView().should('be.visible').clear().type(text)
  }
}
