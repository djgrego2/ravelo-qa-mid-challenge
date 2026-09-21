import { After, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import {
  expectAliasBodyEq,
  expectAliasBodyGreaterThan,
  expectAliasBodyNotStatus,
  expectAliasStatus,
} from '../../../support/api/http-assertions'
import { createUser, deleteUser, generateToken } from '../../../support/api/account'
import {
  addBooksToUser,
  deleteBookFromUser,
  getAllBooks,
  getBookByIsbn,
} from '../../../support/api/bookstore'

let sampleIsbn: string
let sampleTitle: string
let userId: string
let token: string
const password = 'Test1234!'

Given('bookstore sample data is loaded from fixtures', () => {
  cy.fixture('books').then((books) => {
    sampleIsbn = books.sampleBook.isbn
    sampleTitle = books.sampleBook.title
  })
})

Given('a bookstore api test user exists with token', () => {
  const username = `books_${Date.now()}`
  createUser(username, password)
    .then((user) => {
      userId = user.userID
      return generateToken(username, password)
    })
    .then((auth) => {
      token = auth.token
    })
})

When('I request all books from the api', () => {
  getAllBooks().as('allBooks')
})

Then('the books list should not be empty', () => {
  expectAliasStatus('@allBooks', 200)
  expectAliasBodyGreaterThan('@allBooks', 'books.length', 0)
})

When('I request the sample book by ISBN', () => {
  getBookByIsbn(sampleIsbn).as('oneBook')
})

Then('the book response should match the sample title and ISBN', () => {
  expectAliasStatus('@oneBook', 200)
  expectAliasBodyEq('@oneBook', 'isbn', sampleIsbn)
  expectAliasBodyEq('@oneBook', 'title', sampleTitle)
})

When('I request a book with empty ISBN', () => {
  getBookByIsbn('').as('badIsbn')
})

Then('the book response status should not be success', () => {
  expectAliasBodyNotStatus('@badIsbn', 200)
})

When('I add the sample book to the user collection', () => {
  addBooksToUser(userId, token, [sampleIsbn]).as('addBook')
})

Then('adding the book should succeed', () => {
  expectAliasStatus('@addBook', 201)
})

When('I remove the sample book from the user collection', () => {
  deleteBookFromUser(userId, token, sampleIsbn).as('removeBook')
})

Then('removing the book should return no content', () => {
  expectAliasStatus('@removeBook', 204)
})

After(() => {
  if (userId && token) {
    deleteUser(userId, token)
  }
})
