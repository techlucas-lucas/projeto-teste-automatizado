Cypress.Commands.add('createProductByApi', (token, product) => {
    return cy.request({
        method: 'POST',
        url: Cypress.env('apiBaseUrl') + 'produtos',
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
