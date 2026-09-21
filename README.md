# ravelo qa automation challenge

cypress + typescript + cucumber against [demoqa.com](https://demoqa.com). ui stuff is gherkin in `cypress/e2e`, page objects in `cypress/pages`. there are also api and hybrid tests for the bookstore.

## setup

node 22+ (same as github actions).

```bash
npm install
```

first run downloads the cypress browser, give it a minute.

optional: `npx cypress verify`

## run tests

full suite headless:

```bash
npm test
```

open the runner if you want to watch:

```bash
npm run cy:open
```

by tag (cypress 16 uses `--expose`, not `--env`):

```bash
npm run test:smoke
npm run test:ui
npm run test:api
npm run test:hybrid
npm run test:accessibility
```

example mix: `npx cypress run --expose tags="@ui and @smoke"`

only ui features: `npx cypress run --spec "cypress/e2e/ui/**/*.feature"`

## where things live

- features → `cypress/e2e/**/*.feature`
- steps → `cypress/e2e/step_definitions`
- fixtures → `cypress/fixtures`
- api helpers → `cypress/support/api`

tags you will see: `@ui` `@api` `@hybrid` `@smoke` `@accessibility`

## reports

after `npm test` check `cypress/reports/html/index.html` (mochawesome + revelo styling). junit is in `cypress/reports/junit/` if you need ci xml.

short write-up for reviewers: `REPORT.md`. product bugs DEF-001 through DEF-003: `DEFECTS.md`.

refresh branding without re-running everything: `npm run report:brand`

## ci and published reports

github actions: `.github/workflows/cypress.yml`. lint on every push/pr. prs run smoke, main/master runs the full suite.

**where reviewers can see reports**

1. **GitHub Pages** after a push to `main` or `master`: open the repo **Settings → Pages** and set source to **GitHub Actions** once. then each green run deploys the latest html to Pages. start at `readme.html` on your site root or open `index.html` for the mochawesome run. `REPORT.md` and `DEFECTS.md` are copied into the same bundle.
2. **Workflow artifacts** on any run: download **mochawesome-html-report** or **junit-results** from the Actions tab (works on pull requests too).

local run: `cypress/reports/html/index.html` after `npm test`.

## lint

```bash
npm run lint
npm run format:check
```

## heads up

demoqa throws ads and random js errors. we strip ads on visit and only ignore exceptions listed in `cypress/support/demoqa-exceptions.ts`.

checkbox tree was too flaky so coverage is buttons + radio instead. api tests create real users and try to delete them in hooks.

practice form sometimes accepts a bad email. We track that as DEF-001 in `DEFECTS.md`.
