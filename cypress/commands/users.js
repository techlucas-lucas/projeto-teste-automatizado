Cypress.Commands.add('createUserByApi', (user) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('apiBaseUrl')}usuarios`,
        body: user,
        failOnStatusCode: false
    }).then((response) => {
        expect([201, 400]).to.include(response.status)
        if (response.status === 201) {
            return { ...user, _id: response.body._id }
        }
        return user
    })
})

Cypress.Commands.add('deleteUserById', (userId) => {
    return cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiBaseUrl')}usuarios/${userId}`,
        failOnStatusCode: false
    }).then((response) => {
        expect([200, 400]).to.include(response.status)
        if (response.status === 200) {
            expect(response.body.message).to.contain('Registro excluído com sucesso')
        }
        return response
    })
})

Cypress.Commands.add('cleanupUserByEmail', (email) => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}usuarios`,
        qs: {
            email: email
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200)
        const usuarios = response.body.usuarios || []

        if (usuarios.length > 0) {
            usuarios.forEach((usuario) => {
                cy.deleteUserById(usuario._id)
            })
        } else {
            cy.log(`Nenhum usuário encontrado para o email: ${email}`)
        }
    })
})