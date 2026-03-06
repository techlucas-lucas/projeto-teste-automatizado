// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login',(email,password) => {
    cy.visit('https://front.serverest.dev/')
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="senha"]').type(password)
    cy.get('[data-testid="entrar"]').click()
    cy.url().should('not.include', '/login')
    cy.get('[data-testid="logout"]').should('be.visible')
})

Cypress.Commands.add('apiLogin',(email,password) => {
    cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                email: email,
                password: password
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message')
            expect(response.body).to.have.property('authorization')
            expect(response.body.message).to.eq('Login realizado com sucesso')

            return response.body.authorization
        })
})

Cypress.Commands.add('createProductByApi', (token, product) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    headers: {
      authorization: token
    },
    body: product
  }).then((response) => {
    expect(response.status).to.eq(201)
    expect(response.body.message).to.eq('Cadastro realizado com sucesso')
    expect(response.body._id).to.exist

    return {
      ...product,
      _id: response.body._id
    }
  })
})

Cypress.Commands.add('setUserAdminStatus', (userData, isAdmin) => {
  return cy.request({
    method: 'GET',
    url: `https://serverest.dev/usuarios?email=${userData.email}`,
    failOnStatusCode: false
  }).then((getResponse) => {
    expect(getResponse.status).to.eq(200)
    expect(getResponse.body.usuarios).to.be.an('array').and.not.be.empty

    const userId = getResponse.body.usuarios[0]._id
    const desiredAdminValue = isAdmin ? 'true' : 'false'

    return cy.request({
      method: 'PUT',
      url: `https://serverest.dev/usuarios/${userId}`,
      body: {
        nome: userData.name,
        email: userData.email,
        password: userData.password,
        administrador: desiredAdminValue
      }
    }).then((putResponse) => {
      expect(putResponse.status).to.eq(200)
      expect(putResponse.body.message).to.eq('Registro alterado com sucesso')
    })
  })
})

Cypress.Commands.add('cleanupUserByEmail', (email) => {
  cy.request({
    method: 'GET',
    url: `https://serverest.dev/usuarios?email=${email}`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`GET cleanup status: ${response.status}`)
    cy.log(`GET cleanup body: ${JSON.stringify(response.body)}`)

    expect(response.status).to.eq(200)

    const usuarios = response.body.usuarios || []

    if (!usuarios.length) {
      cy.log('Nenhum usuário encontrado para ${email}')
      return
    }

    cy.wrap(usuarios).each((usuario) => {
      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${usuario._id}`,
        failOnStatusCode: false
      }).then((deleteResponse) => {
        cy.log(`DELETE status: ${deleteResponse.status}`)
        cy.log(`DELETE body: ${JSON.stringify(deleteResponse.body)}`)

        // aceita os cenários reais do cleanup
        expect([200, 400]).to.include(deleteResponse.status)

        if (deleteResponse.status === 200) {
          expect(deleteResponse.body.message).to.contain('Registro excluído com sucesso')
        }

        if (deleteResponse.status === 400) {
          cy.log('Usuário ${usuario._id} não pôde ser excluído: ${deleteResponse.body.message}')
        }
      })
    })
  })
})