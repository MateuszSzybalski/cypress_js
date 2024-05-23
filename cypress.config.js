const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1400,
  viewportHeight: 1024,
  projectId: 'Szybka-Cypress',
  e2e: {
    //baseUrl: '/',
    specPattern: 'cypress/e2e/*.js'
  },
  component: {
      specPattern: 'cypress/POM/*.js'
    }
})
