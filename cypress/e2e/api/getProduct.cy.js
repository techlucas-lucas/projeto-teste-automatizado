describe('API - GET Product Test', () => {
  it('Get Product Success', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos',
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('quantidade')
      expect(response.body).to.have.property('produtos')
      expect(response.body.produtos).to.be.an('array')

      if (response.body.produtos.length > 0) {
        const firstProduct = response.body.produtos[0]
        const idProduct = firstProduct._id

        expect(firstProduct).to.have.property('_id')
        expect(firstProduct).to.have.property('nome')

        cy.log(`Primeiro produto: ${firstProduct.nome}`)
        cy.log(`ID do primeiro produto: ${idProduct}`)
      } else {
        cy.log('Nenhum produto encontrado')
      }
    })
  })
})