import { API_BASE } from '../constants'

export type DemoQAUser = {
  userID: string
  username: string
  books: unknown[]
}

export type TokenResponse = {
  token: string
  expires: string
  status: string
  result: string
}

export function createUser(userName: string, password: string) {
  return cy
    .request<DemoQAUser>({
      method: 'POST',
      url: `${API_BASE}/Account/v1/User`,
      body: { userName, password },
    })
    .then((res) => {
      expect(res.status).to.eq(201)
      return res.body
    })
}

export function generateToken(userName: string, password: string) {
  return cy
    .request<TokenResponse>({
      method: 'POST',
      url: `${API_BASE}/Account/v1/GenerateToken`,
      body: { userName, password },
    })
    .then((res) => {
      expect(res.status).to.eq(200)
      return res.body
    })
}

export function deleteUser(userId: string, token: string) {
  return cy.request({
    method: 'DELETE',
    url: `${API_BASE}/Account/v1/User/${userId}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
  })
}

// authorized endpoint wants user and password in the json body
export function checkAuthorized(userName: string, password: string) {
  return cy.request({
    method: 'POST',
    url: `${API_BASE}/Account/v1/Authorized`,
    body: { userName, password },
    failOnStatusCode: false,
  })
}
