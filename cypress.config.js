const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev/',
    env: {
      apiBaseUrl: 'https://serverest.dev/'
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,       // retenta 2x no CI
      openMode: 0        // não retenta no modo interativo
    },
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});