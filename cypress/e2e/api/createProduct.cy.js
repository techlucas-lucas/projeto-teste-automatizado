describe('API - Create Product Test', () => {

    let data;
    before(() => {
        cy.fixture('dataTest').then((tData) => {
            data = tData;
        cy.setUserAdminStatus(data, true)    
        });
    });


    it('Create Success', () => {
        cy.apiLogin(data.email, data.password).then((token) => {
            cy.request({
                method: 'POST',
                url: 'https://serverest.dev/produtos',
                headers: {
                    authorization: token
                },
                body: {
                    nome: data.productName+`_${Date.now()}`,
                    preco: data.value,
                    descricao: data.description,
                    quantidade: data.qtd
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')
                expect(response.body._id).to.exist
            })
        })
    })
})