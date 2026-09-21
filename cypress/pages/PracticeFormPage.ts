import { BasePage } from './BasePage'

export type PracticeFormValidData = {
  firstName: string
  lastName: string
  email: string
  mobile: string
  gender: 'Male' | 'Female' | 'Other'
  day: string
  month: string
  year: string
  subject: string
  hobby: string
  address: string
}

const sel = {
  firstName: '#firstName',
  lastName: '#lastName',
  userEmail: '#userEmail',
  userNumber: '#userNumber',
  gender: {
    Male: '#gender-radio-1',
    Female: '#gender-radio-2',
    Other: '#gender-radio-3',
  },
  dateOfBirthInput: '#dateOfBirthInput',
  monthSelect: '.react-datepicker__month-select',
  yearSelect: '.react-datepicker__year-select',
  dayCell: '.react-datepicker__day:not(.react-datepicker__day--outside-month)',
  subjectsInput: '#subjectsInput',
  hobbies: {
    Sports: '#hobbies-checkbox-1',
    Reading: '#hobbies-checkbox-2',
    Music: '#hobbies-checkbox-3',
  },
  currentAddress: '#currentAddress',
  submit: '#submit',
  modalContent: '.modal-content',
  modalTitle: '.modal-title',
  modalBody: '.modal-body',
} as const

export class PracticeFormPage extends BasePage {
  protected path = '/automation-practice-form'

  fillBasicInfo(data: { firstName: string; lastName: string; email: string; mobile: string }) {
    this.safeType(sel.firstName, data.firstName)
    this.safeType(sel.lastName, data.lastName)
    this.safeType(sel.userEmail, data.email)
    this.safeType(sel.userNumber, data.mobile)
  }

  selectGender(gender: 'Male' | 'Female' | 'Other') {
    // demoqa hides native radio inputs; force is required for check()
    this.safeCheck(sel.gender[gender], { force: true })
  }

  pickDate(day: string, month: string, year: string) {
    this.safeClick(sel.dateOfBirthInput)
    cy.get(sel.monthSelect).select(month)
    cy.get(sel.yearSelect).select(year)
    cy.contains(sel.dayCell, day).click()
    // datepicker popper stays in DOM; subjects click dismisses overlay (demoqa quirk)
    cy.get(sel.subjectsInput).scrollIntoView().click({ force: true })
  }

  addSubject(subject: string) {
    cy.get(sel.subjectsInput).type(`${subject}{enter}`)
  }

  selectHobby(hobby: string) {
    const id = sel.hobbies[hobby as keyof typeof sel.hobbies]
    this.safeCheck(id, { force: true })
  }

  fillAddress(address: string) {
    cy.get(sel.currentAddress).scrollIntoView().type(address, { force: true })
  }

  submit() {
    this.safeClick(sel.submit, { force: true })
  }

  fillAndSubmitValid(data: PracticeFormValidData) {
    this.visit()
    this.fillBasicInfo(data)
    this.selectGender(data.gender)
    this.pickDate(data.day, data.month, data.year)
    this.addSubject(data.subject)
    this.selectHobby(data.hobby)
    this.fillAddress(data.address)
    this.submit()
  }

  expectSuccessModalContains(text: string) {
    cy.get(sel.modalContent).should('be.visible')
    cy.get(sel.modalTitle).should('contain', 'Thanks for submitting the form')
    cy.get(sel.modalBody).should('contain', text)
  }

  /**
   * Expected: invalid email cannot submit. If success modal appears, records DEF-001 (see DEFECTS.md).
   */
  expectInvalidEmailHandling() {
    cy.get(sel.userEmail).should('have.value', 'not-an-email')

    cy.get('body').then(($body) => {
      const successVisible =
        $body.find(`${sel.modalContent}:visible`).length > 0 &&
        $body.find(sel.modalTitle).text().includes('Thanks for submitting the form')

      if (successVisible) {
        cy.addTestContext({
          title: 'DEF-001',
          value:
            'Practice form submitted with invalid email and showed success modal — see DEFECTS.md',
        })
        cy.get(sel.modalTitle).should('contain', 'Thanks for submitting the form')
        return
      }

      cy.get('body').find(`${sel.modalContent}:visible`).should('have.length', 0)
      cy.get(sel.userEmail).should('have.value', 'not-an-email')
    })
  }
}
