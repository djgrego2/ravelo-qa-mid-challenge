import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { PracticeFormPage, PracticeFormValidData } from '../../../pages/PracticeFormPage'

const form = new PracticeFormPage()

let validData: PracticeFormValidData
let invalidEmailData: {
  firstName: string
  lastName: string
  email: string
  mobile: string
  gender: 'Male' | 'Female' | 'Other'
}

Given('practice form valid data from fixtures', () => {
  cy.fixture('practice-form').then((fixture) => {
    validData = fixture.valid
  })
})

Given('practice form invalid email data from fixtures', () => {
  cy.fixture('practice-form').then((fixture) => {
    invalidEmailData = fixture.invalidEmail
  })
})

When('I fill and submit the practice form with that data', () => {
  form.fillAndSubmitValid(validData)
})

When('I fill basic practice form fields and submit', () => {
  form.visit()
  form.fillBasicInfo(invalidEmailData)
  form.selectGender(invalidEmailData.gender)
  form.submit()
})

Then('the success modal should contain the submitted name and email', () => {
  form.expectSuccessModalContains(validData.firstName)
  form.expectSuccessModalContains(validData.lastName)
  form.expectSuccessModalContains(validData.email)
})

Then('the invalid email outcome should be handled', () => {
  form.expectInvalidEmailHandling()
})
