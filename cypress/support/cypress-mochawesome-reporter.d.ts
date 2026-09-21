declare namespace Cypress {
  interface Chainable {
    addTestContext(context: string | { title: string; value: unknown }): Chainable<void>
  }
}

declare module 'cypress-mochawesome-reporter/lib' {
  import type { CypressRunResult } from 'cypress/types/runner'

  export function beforeRunHook(details: { config: Cypress.ConfigOptions }): Promise<void>
  export function afterRunHook(results?: CypressRunResult): Promise<void>
}
