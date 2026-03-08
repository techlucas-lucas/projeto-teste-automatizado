Cypress.Commands.add('apiLogin', (email, password) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiBaseUrl')}login`,
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
