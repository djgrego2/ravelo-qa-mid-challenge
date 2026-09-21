import { BasePage } from './BasePage'

const sel = {
  searchBox: '#searchBox',
  userNameValue: '#userName-value',
} as const

export class BookStorePage extends BasePage {
  protected path = '/books'

  searchBook(title: string) {
    cy.get(sel.searchBox).clear()
    cy.get(sel.searchBox).type(title)
  }

  addBookToCollection(title: string) {
    cy.dismissAds()
    cy.contains('tr', title)
      .contains('a', 'Add To Your Collection')
      .scrollIntoView()
      .should('be.visible')
      .click()
  }

  goToProfile() {
    this.safeClick(sel.userNameValue)
  }

  expectCatalogTitles(titles: string[]) {
    titles.forEach((title) => {
      cy.contains(title).should('be.visible')
    })
  }
}
