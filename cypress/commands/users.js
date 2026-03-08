Cypress.Commands.add('setUserAdminStatus', (userData, isAdmin) => {
    return cy.request({
        method: 'GET',
        url: Cypress.env('apiBaseUrl') + `usuarios?email=${userData.email}`,
        failOnStatusCode: false
    }).then((getResponse) => {
        expect(getResponse.status).to.eq(200)
        expect(getResponse.body.usuarios).to.be.an('array').and.not.be.empty

        const userId = getResponse.body.usuarios[0]._id
        const desiredAdminValue = isAdmin ? 'true' : 'false'

        return cy.request({
            method: 'PUT',
            url: Cypress.env('apiBaseUrl') + `usuarios/${userId}`,
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
        url: Cypress.env('apiBaseUrl') + `usuarios?email=${email}`,
        failOnStatusCode: false
    }).then((response) => {
        cy.log(`GET cleanup status: ${response.status}`)
        cy.log(`GET cleanup body: ${JSON.stringify(response.body)}`)

        expect(response.status).to.eq(200)

        const usuarios = response.body.usuarios || []

        if (!usuarios.length) {
            cy.log(`Nenhum usuário encontrado para ${email}`)
            return
        }

        cy.wrap(usuarios).each((usuario) => {
            cy.request({
                method: 'DELETE',
                url: Cypress.env('apiBaseUrl') + `usuarios/${usuario._id}`,
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
                    cy.log(`Usuário ${usuario._id} não pôde ser excluído: ${deleteResponse.body.message}`)
                }
            })
        })
    })
})