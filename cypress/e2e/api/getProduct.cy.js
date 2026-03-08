describe('API - GET Product', () => {

  let dynamicAdmin;
  let product;

  before(() => {
    cy.fixture('dataTest').then((tData) => {
      dynamicAdmin = {
        nome: tData.name,
        email: `get_prod_${Date.now()}@qa.com`,
        password: tData.password,
        administrador: "true"
      }

      const newProduct = {
        nome: `${tData.productName}_${Date.now()}`,
        preco: tData.value,
        descricao: tData.description,
        quantidade: tData.qtd
      }

      cy.createUserByApi(dynamicAdmin).then((adminWithId) => {
        dynamicAdmin = adminWithId
        cy.apiLogin(dynamicAdmin.email, dynamicAdmin.password).then((token) => {
          cy.createProductByApi(token, newProduct).then((createdProduct) => {
            product = createdProduct
          })
        })
      })
    })
  })

  after(() => {
    if (product && product._id && dynamicAdmin && dynamicAdmin.email) {
      cy.apiLogin(dynamicAdmin.email, dynamicAdmin.password).then((freshToken) => {
        cy.request({
          method: 'DELETE',
          url: `${Cypress.env('apiBaseUrl')}produtos/${product._id}`,
          headers: { authorization: freshToken },
          failOnStatusCode: false
        })
      })
    }
    if (dynamicAdmin && dynamicAdmin._id) {
      cy.deleteUserById(dynamicAdmin._id)
    }
  })

  it('should list products with valid structure', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('apiBaseUrl') + 'produtos',
      headers: {
        accept: 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('quantidade')
      expect(response.body).to.have.property('produtos')
      expect(response.body.produtos).to.be.an('array')
      expect(response.body.quantidade).to.be.greaterThan(0)

      const found = response.body.produtos.find(p => p._id === product._id)
      expect(found).to.exist
      expect(found).to.have.property('nome', product.nome)
      expect(found).to.have.property('_id')
    })
  })
})
