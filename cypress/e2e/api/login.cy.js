describe('API - Login', () => {

  let dynamicUser;

  before(() => {
    cy.fixture('dataTest').then((tData) => {
      dynamicUser = {
        nome: tData.name,
        email: `api_${Date.now()}@qa.com`,
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

  it('should return 401 for invalid credentials', () => {
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

  it('should login successfully', () => {
    cy.apiLogin(dynamicUser.email, dynamicUser.password)
  })
})
