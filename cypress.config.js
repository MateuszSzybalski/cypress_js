const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1400,
  viewportHeight: 1024,
  projectId: 'Szybka-Cypress',
  e2e: {
    baseUrl: 'https://www.bureau-ice.nl',
    specPattern: 'cypress/e2e/tests/*.js'
  },
  component: {
      specPattern: 'cypress/POM/*.js'
    }
})
