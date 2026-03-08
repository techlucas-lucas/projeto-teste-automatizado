class RegisterPage {
    constructor() {
        this.nameInput = '[data-testid="nome"]'
        this.emailInput = '[data-testid="email"]'
        this.passwordInput = '[data-testid="password"]'
        this.adminCheckbox = '[data-testid="checkbox"]'
        this.registerButton = '[data-testid="cadastrar"]'
    }
    visit() {
        cy.visit('/cadastrarusuarios')
        return this
    }
    fillName(name) {
        cy.get(this.nameInput).type(name)
        return this
    }
    fillEmail(email) {
        cy.get(this.emailInput).type(email)
        return this
    }
    fillPassword(password) {
        cy.get(this.passwordInput).type(password)
        return this
    }
    toggleAdmin() {
        cy.get(this.adminCheckbox).click()
        return this
    }
    submit() {
        cy.get(this.registerButton).click()
        return this
    }
    assertFieldRequired(message) {
        cy.contains(message).should('be.visible')
    }
    assertRegistrationSuccess() {
        cy.contains('Cadastro realizado com sucesso').should('be.visible')
    }
}
export default new RegisterPage()
