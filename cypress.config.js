const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev/',
    env: {
      apiBaseUrl: 'https://serverest.dev/'
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 20000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {

    },
  },
});