import { LoginPage } from '../../support/pages'

describe('UI - Login', () => {
  let dynamicUser;

  before(() => {
    cy.fixture('dataTest').then((tData) => {
      dynamicUser = {
        nome: tData.name,
        email: `test_${Date.now()}@qa.com`,
        password: tData.password,
        administrador: "true"
      }
      cy.createUserByApi(dynamicUser).then((userWithId) => {
        dynamicUser = userWithId
      })
    });
  });

  after(() => {
    if (dynamicUser && dynamicUser.email) {
      cy.cleanupUserByEmail(dynamicUser.email)
    }
  })

  it('should show error for invalid credentials', () => {
    LoginPage.visit()
    LoginPage.fillEmail('teste@lucas.com')
    LoginPage.fillPassword('1')
    LoginPage.clickLogin()
    LoginPage.assertLoginError('Email e/ou senha inválidos')
  })

  it('should login successfully', () => {
    LoginPage.login(dynamicUser.email, dynamicUser.password)
    LoginPage.assertLoginSuccess()
  })
})
