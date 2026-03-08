describe('API - Create Product', () => {

  let data;
  let dynamicAdmin;
  let createdProduct;

  before(() => {
    cy.fixture('dataTest').then((tData) => {
      data = tData;
      dynamicAdmin = {
        nome: tData.name,
        email: `admin_prod_${Date.now()}@qa.com`,
        password: tData.password,
        administrador: "true"
      }
      cy.createUserByApi(dynamicAdmin).then((user) => {
        dynamicAdmin = user
      })
    });
  });

  after(() => {
    if (createdProduct && createdProduct._id && dynamicAdmin && dynamicAdmin.email) {
      cy.apiLogin(dynamicAdmin.email, dynamicAdmin.password).then((token) => {
        cy.request({
          method: 'DELETE',
          url: `${Cypress.env('apiBaseUrl')}produtos/${createdProduct._id}`,
          headers: { authorization: token },
          failOnStatusCode: false
        })
      })
    }
    if (dynamicAdmin && dynamicAdmin._id) {
      cy.deleteUserById(dynamicAdmin._id)
    }
  })

  it('should create product successfully', () => {
    cy.apiLogin(dynamicAdmin.email, dynamicAdmin.password).then((token) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiBaseUrl')}produtos`,
        headers: {
          authorization: token
        },
        body: {
          nome: data.productName + `_${Date.now()}`,
          preco: data.value,
          descricao: data.description,
          quantidade: data.qtd
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        expect(response.body._id).to.exist
        createdProduct = { _id: response.body._id }
      })
    })
  })
})
