import { LoginPage, ProductsPage } from '../../support/pages'

describe('UI - Cart', () => {
  let token
  let product
  let dynamicAdmin
  let dynamicUser

  before(() => {
    cy.fixture('dataTest').then((tData) => {
      dynamicAdmin = {
        nome: tData.name,
        email: `admin_cart_${Date.now()}@qa.com`,
        password: tData.password,
        administrador: "true"
      }
      dynamicUser = {
        nome: tData.name,
        email: `cart_${Date.now()}@qa.com`,
        password: tData.password,
        administrador: "false"
      }

      const newProduct = {
        nome: `Produto UI ${Date.now()}`,
        preco: 150,
        descricao: 'Produto criado via API para teste UI',
        quantidade: 5
      }

      cy.createUserByApi(dynamicAdmin).then((adminWithId) => {
        dynamicAdmin = adminWithId
        cy.apiLogin(dynamicAdmin.email, dynamicAdmin.password).then((returnedToken) => {
          token = returnedToken
          cy.createProductByApi(token, newProduct).then((createdProduct) => {
            product = createdProduct
          })
        })
      })

      cy.createUserByApi(dynamicUser).then((userWithId) => {
        dynamicUser = userWithId
      })
    })
  })

  beforeEach(() => {
    LoginPage.login(dynamicUser.email, dynamicUser.password)
    LoginPage.assertLoginSuccess()
    cy.get('[data-testid="pesquisar"]', { timeout: 10000 }).should('be.visible')
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
    if (dynamicUser && dynamicUser._id) {
      cy.deleteUserById(dynamicUser._id)
    }
  })

  it('should add item to cart', () => {
    ProductsPage.searchProduct(product.nome)
    ProductsPage.assertProductVisible(product.nome)
    ProductsPage.addToCart()
    ProductsPage.assertCartPageVisible()
  })

  it('should clear the cart', () => {
    ProductsPage.searchProduct(product.nome)
    ProductsPage.addToCart()
    ProductsPage.assertCartPageVisible()
    ProductsPage.clearCart()
    ProductsPage.assertCartIsEmpty()
  })
})
