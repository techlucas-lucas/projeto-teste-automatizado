import LoginPage from '../../support/pages/LoginPage'
describe('Login Test', () => {
  let data;
  before(() => {
    cy.fixture('dataTest').then((tData) => {
      data = tData;
    });
  });
  it('Login - Error - Invalid Credentials', () => {
    LoginPage.visit()
    LoginPage.fillEmail('teste@lucas.com')
    LoginPage.fillPassword('1')
    LoginPage.clickLogin()
    LoginPage.assertLoginError('Email e/ou senha inválidos')
  })
  it('Login - Success', () => {
    LoginPage.login(data.email, data.password)
    LoginPage.assertLoginSuccess()
  })
})