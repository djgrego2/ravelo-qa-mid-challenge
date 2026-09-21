import { BasePage } from './BasePage'

const sel = {
  profileWrapper: '.profile-wrapper',
} as const

export class ProfilePage extends BasePage {
  protected path = '/profile'

  expectBookVisible(title: string) {
    cy.contains(sel.profileWrapper, title).should('be.visible')
  }
}
