type Alias = `@${string}`

export function expectAliasStatus(alias: Alias, status: number) {
  cy.get(alias).its('status').should('eq', status)
}

export function expectAliasBodyEq<T>(alias: Alias, property: string, value: T) {
  cy.get(alias).its(`body.${property}`).should('eq', value)
}

export function expectAliasBodyRoot<T>(alias: Alias, value: T) {
  cy.get(alias).its('body').should('eq', value)
}

export function expectAliasBodyGreaterThan(alias: Alias, property: string, min: number) {
  cy.get(alias).its(`body.${property}`).should('be.greaterThan', min)
}

export function expectAliasBodyNotStatus(alias: Alias, status: number) {
  cy.get(alias).its('status').should('not.eq', status)
}
