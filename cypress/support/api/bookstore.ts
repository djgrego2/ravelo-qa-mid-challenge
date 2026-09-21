import { API_BASE } from '../constants'

export function getAllBooks() {
  return cy.request({
    method: 'GET',
    url: `${API_BASE}/BookStore/v1/Books`,
  })
}

// swagger says ISBN in the query string
export function getBookByIsbn(isbn: string) {
  return cy.request({
    method: 'GET',
    url: `${API_BASE}/BookStore/v1/Book`,
    qs: { ISBN: isbn },
    failOnStatusCode: false,
  })
}

export function addBooksToUser(userId: string, token: string, isbns: string[]) {
  return cy.request({
    method: 'POST',
    url: `${API_BASE}/BookStore/v1/Books`,
    headers: { Authorization: `Bearer ${token}` },
    body: {
      userId,
      collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
    },
  })
}

export function deleteBookFromUser(userId: string, token: string, isbn: string) {
  return cy.request({
    method: 'DELETE',
    url: `${API_BASE}/BookStore/v1/Book`,
    headers: { Authorization: `Bearer ${token}` },
    body: { userId, isbn },
  })
}
