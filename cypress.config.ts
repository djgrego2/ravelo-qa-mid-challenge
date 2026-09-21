import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
import fix from 'cypress-on-fix'
import { afterRunHook, beforeRunHook } from 'cypress-mochawesome-reporter/lib'
import { applyReveloReportBranding } from './scripts/apply-revelo-report-branding'

export default defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    video: true,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.feature',
    async setupNodeEvents(on, config) {
      on = fix(on)
      on('before:run', async (details) => {
        await beforeRunHook(details)
      })
      await addCucumberPreprocessorPlugin(on, config)
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      )
      on('after:run', async (results) => {
        await afterRunHook(results)
        applyReveloReportBranding()
      })
      return config
    },
  },
  env: {
    apiUrl: 'https://demoqa.com',
  },
})
