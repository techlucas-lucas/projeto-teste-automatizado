describe('API - Login Test', () => {

  let data;
  before(() => {
    cy.fixture('dataTest').then((tData) => {
      data = tData;
    });
  });

  it('Login - Error - Invalid Credentials', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('apiBaseUrl') + 'login',
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "email": "fulano@qateste.com",
        "password": "teste"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.eq('Email e/ou senha inválidos')
    })
  })

  it('Login Success', () => {
    cy.apiLogin(data.email, data.password)
  })
})