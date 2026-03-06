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
        url: `https://serverest.dev/produtos/${product._id}`,
        headers: {
          authorization: token
        },
        failOnStatusCode: false
      })
    }
  })

  it('Add item to a Cart', () => {
    cy.get('[data-testid="pesquisar"]').type(product.nome)
    cy.get('[data-testid="botaoPesquisar"]').click()
    cy.contains(product.nome).should('be.visible')
    cy.get('[data-testid="adicionarNaLista"]').click()
  })


  it('Clean the Cart', () => {
    //cy.login(data.email, data.password)
    cy.get('[data-testid="pesquisar"]').type(product.nome)
    cy.get('[data-testid="botaoPesquisar"]').click()
    cy.get('[data-testid="adicionarNaLista"]').click()
    cy.contains('h1', 'Lista de Compras')
    cy.get('[data-testid="limparLista"]').click()
    cy.get('[data-testid="shopping-cart-empty-message"]').contains('Seu carrinho está vazio')
  })
})