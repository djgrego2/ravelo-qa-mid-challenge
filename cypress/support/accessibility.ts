// demoqa puts label inside id-wrapper divs

export function expectDemoQaLabeledInput(inputId: string) {
  cy.get(`#${inputId}-wrapper`).find('label').should('be.visible')
  cy.get(`#${inputId}`).should('be.visible')
}

export function expectInputType(inputSelector: string, type: string) {
  cy.get(inputSelector).should('have.attr', 'type', type)
}

export function expectPlaceholder(inputSelector: string, placeholder: string) {
  cy.get(inputSelector).should('have.attr', 'placeholder', placeholder)
}
