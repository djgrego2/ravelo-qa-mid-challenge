import { After, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import { generateToken } from '../../../support/api/account'
import { addBooksToUser, getAllBooks } from '../../../support/api/bookstore'
import { API_BASE } from '../../../support/constants'
import { BookStorePage } from '../../../pages/BookStorePage'
import { LoginPage } from '../../../pages/LoginPage'
import { ProfilePage } from '../../../pages/ProfilePage'

const store = new BookStorePage()
const profile = new ProfilePage()
const loginPage = new LoginPage()

let userId: string
let username: string
let password: string
let token: string
let apiTitles: string[]
let sampleBookTitle: string

Given('a hybrid bookstore user was created via api with token', () => {
  cy.createDemoQAUser('bookstore')
    .then((user) => {
      userId = user.userId
      username = user.username
      password = user.password
      return generateToken(username, password)
    })
    .then((auth) => {
      token = auth.token
    })
})

When('I log in through the ui with that user', () => {
  loginPage.login(username, password)
})

Then('the profile should show the logged in username', () => {
  loginPage.expectLoggedInAs(username)
})

When('I add the fixture sample book to that user via api', () => {
  cy.fixture('books').then((books) => {
    sampleBookTitle = books.sampleBook.title
    addBooksToUser(userId, token, [books.sampleBook.isbn])
  })
})

When('I open the profile page', () => {
  profile.visit()
})

Then('the profile should list the sample book title', () => {
  profile.expectBookVisible(sampleBookTitle)
})

When('I fetch all book titles from the api', () => {
  getAllBooks().then((res) => {
    apiTitles = res.body.books.map((b: { title: string }) => b.title)
  })
})

When('I open the bookstore page', () => {
  store.visit()
})

Then('the ui catalog should list those titles', () => {
  store.expectCatalogTitles(apiTitles)
})

After(() => {
  if (userId && token) {
    cy.request({
      method: 'DELETE',
      url: `${API_BASE}/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    })
  }
})
