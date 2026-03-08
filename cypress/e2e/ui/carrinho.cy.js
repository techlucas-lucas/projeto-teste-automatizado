import ProductsPage from '../../support/pages/ProductsPage'

describe('Test Cart', () => {
  let data
  let token
  let product

  before(() => {
    cy.fixture('dataTest').then((tData) => {
      data = tData

      cy.apiLogin(tData.email, tData.password).then((returnedToken) => {
        token = returnedToken
        cy.setUserAdminStatus(data, true)
        const newProduct = {
          nome: `Produto UI ${Date.now()}`,
          preco: 150,
          descricao: 'Produto criado via API para teste UI',
          quantidade: 5
        }

        cy.createProductByApi(token, newProduct).then((createdProduct) => {
          product = createdProduct
        })
      })
      cy.setUserAdminStatus(data, false)
    })
  })

  beforeEach(() => {
    cy.login(data.email, data.password)
  });

  after(() => {
    if (product && product._id) {
      cy.request({
        method: 'DELETE',
        url: Cypress.env('apiBaseUrl') + `produtos/${product._id}`,
        headers: {
          authorization: token
        },
        failOnStatusCode: false
      })
    }
  })

  it('Add item to a Cart', () => {
    ProductsPage.searchProduct(product.nome)
    ProductsPage.assertProductVisible(product.nome)
    ProductsPage.addToCart()
    ProductsPage.assertCartPageVisible()
  })

  it('Clean the Cart', () => {
    ProductsPage.searchProduct(product.nome)
    ProductsPage.addToCart()
    ProductsPage.assertCartPageVisible()
    ProductsPage.clearCart()
    ProductsPage.assertCartIsEmpty()
  })
})
