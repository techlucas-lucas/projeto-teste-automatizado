class ProductsPage {
    constructor() {
        this.searchInput = '[data-testid="pesquisar"]'
        this.searchButton = '[data-testid="botaoPesquisar"]'
        this.addToCartButton = '[data-testid="adicionarNaLista"]'
        this.clearCartButton = '[data-testid="limparLista"]'
    }
    searchProduct(productName) {
        cy.get(this.searchInput).type(productName)
        cy.get(this.searchButton).click()
        return this
    }
    addToCart() {
        cy.get(this.addToCartButton).click()
        return this
    }
    clearCart() {
        cy.get(this.clearCartButton).click()
        return this
    }
    assertProductVisible(productName) {
        cy.contains(productName).should('be.visible')
    }
    assertCartIsEmpty() {
        cy.contains('Seu carrinho está vazio').should('be.visible')
    }
    assertCartPageVisible() {
        cy.contains('h1', 'Lista de Compras').should('be.visible')
    }
}
export default new ProductsPage()