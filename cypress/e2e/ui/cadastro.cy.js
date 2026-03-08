import { RegisterPage } from '../../support/pages'

describe('UI - Register', () => {
  let data;
  before(() => {
    cy.fixture('dataTest').then((tData) => {
      data = tData
    });
  });
  it('should require name field', () => {
    RegisterPage.visit()
    RegisterPage.fillEmail(data.email)
    RegisterPage.fillPassword(data.password)
    RegisterPage.submit()
    RegisterPage.assertFieldRequired('Nome é obrigatório')
  })
  it('should require email field', () => {
    RegisterPage.visit()
    RegisterPage.fillName(data.name)
    RegisterPage.fillPassword(data.password)
    RegisterPage.submit()
    RegisterPage.assertFieldRequired('Email é obrigatório')
  })
  it('should require password field', () => {
    RegisterPage.visit()
    RegisterPage.fillName(data.name)
    RegisterPage.fillEmail(data.email)
    RegisterPage.submit()
    RegisterPage.assertFieldRequired('Password é obrigatório')
  })
  it('should register admin user successfully', () => {
    const uniqueEmail = `admin_${Date.now()}@qa.com`
    RegisterPage.visit()
    RegisterPage.fillName(data.name)
    RegisterPage.fillEmail(uniqueEmail)
    RegisterPage.fillPassword(data.password)
    RegisterPage.toggleAdmin()
    RegisterPage.submit()
    RegisterPage.assertRegistrationSuccess()
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}usuarios`,
      qs: {
        email: uniqueEmail
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.quantidade).to.eq(1)
      const userId = response.body.usuarios[0]._id
      expect(response.body.usuarios[0].email).to.eq(uniqueEmail)
      expect(response.body.usuarios[0].administrador).to.eq('true')
      cy.deleteUserById(userId)
    })
  })
})
