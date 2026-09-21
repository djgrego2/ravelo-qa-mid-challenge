# test execution report

short summary for whoever reviews the challenge. the fancy html report lives elsewhere.

last time i ran everything with `npm test` headless on demoqa.com. 18 scenarios across 8 feature files, all green, about a minute on a normal laptop.

## what we cover

ui is 5 features and 10 scenarios. forms, alerts, text box, buttons and radio, plus a light a11y smoke.

api is 2 features and 5 scenarios for account and bookstore.

hybrid is 1 feature and 3 scenarios. login, profile, catalog checked against the api.

`npm run test:smoke` runs 9 tagged cases in roughly half the time if you just want a quick pass.

## stuff you get after a run

console output from the spec reporter with pass or fail per scenario.

html at `cypress/reports/html/index.html`. mochawesome with revelo colors. open in the browser or use start on windows.

junit xml under `cypress/reports/junit/` for ci.

video under `cypress/videos/` every run.

screenshots under `cypress/screenshots/` when something fails. they show up in the html too when embedded.

product bugs go in `DEFECTS.md`, not in this file.

## things to know

demoqa is a public sandbox. api tests create real users and we delete them in hooks when the run finishes ok. if you kill the run mid way you might leave data behind.

we dropped checkbox tree coverage because it was too flaky with ads and timing. buttons and radio cover that bit instead.

practice form sometimes accepts a bad email. see DEF-001 in `DEFECTS.md`. alerts page issues DEF-002 and DEF-003 are documented there too.

accessibility checks are smoke level only. labels, placeholders, password type on login. no axe.

account api is one long cucumber scenario because the steps all share the same user id and token.

## how we keep it from flaking

we strip ads on visit with dismissAds. clicks use page helpers when possible. force click only where demoqa is weird. hidden radios, datepicker overlay, submit under the banner.

we no longer ignore every js error. only the known ad and third party noise listed in `cypress/support/demoqa-exceptions.ts`.

api users get unique names with a timestamp. headless runs retry once if something random fails.

## ci

github actions file is `.github/workflows/cypress.yml`. lint on push and pr. smoke on pr, full suite on main or master. uploads junit and html. screenshots and videos if the job fails.

not parallel yet. suite is small. tags and npm scripts are ready if it grows.

## run it yourself

```bash
npm install
npm test
```

smoke only `npm run test:smoke`

by area `npm run test:ui` or `test:api` or `test:hybrid`

lint `npm run lint`
