# defect reports

stuff we noticed on demoqa while building tests. these are site bugs, not broken automation.

---

## DEF-001: Practice form accepts invalid email

| | |
| --- | --- |
| **Severity** | Medium |
| **Where** | practice form, `/automation-practice-form` |
| **Covered in tests** | `practice-form.feature`, scenario *Invalid email documents known defect* |

**Steps**

1. Go to the practice form.
2. Fill the usual required fields but put `not-an-email` in email. same values as `invalidEmail` in `practice-form.json`.
3. Hit submit.

**Expected:** form should not go through. no green success modal saying thanks for submitting.

**Actual:** every now and then it submits anyway and you get that success modal with the bad email still in play.

**Note:** when the bug happens during a run we stamp `DEF-001` into the html report with addTestContext. you can repro by hand with that fixture too.

---

## DEF-002: Alerts prompt button id is misspelled

| | |
| --- | --- |
| **Severity** | Low |
| **Where** | alerts page, `/alerts` |
| **Covered in tests** | site markup only. alert scenarios in `alerts.feature` use other buttons |

**Steps**

1. Open alerts.
2. Look at the prompt button in devtools.

**Expected:** something sane like `promptButton`.

**Actual:** the id is `promtButton`. missing a p. `promptButton` does not exist.

**Note:** our tests have to target the typo or the click fails. annoying for selectors and anything that expects readable ids.

---

## DEF-003: Alerts buttons all say the same thing

| | |
| --- | --- |
| **Severity** | Low |
| **Where** | alerts page, `/alerts` |
| **Covered in tests** | manual check on `/alerts`. `alerts.feature` covers confirm flows by id |

**Steps**

1. Open alerts.
2. Read the text on the alert, confirm, and prompt buttons.

**Expected:** different labels so you know which dialog you are firing.

**Actual:** all three say **Click me**. same string on `#alertButton`, `#confirmButton`, and `#promtButton`.

**Note:** fine for a toy demo, rough for real users and screen readers picking a button by name.
