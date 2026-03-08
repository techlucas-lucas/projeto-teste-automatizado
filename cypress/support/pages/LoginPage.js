class LoginPage {
    constructor() {
        this.emailInput = '[data-testid="email"]'
        this.passwordInput = '[data-testid="senha"]'
        this.loginButton = '[data-testid="entrar"]'
        this.logoutButton = '[data-testid="logout"]'
    }
    visit() {
        cy.visit('/login')
        return this
    }
    fillEmail(email) {
        cy.get(this.emailInput).clear().type(email)
        return this
    }
    fillPassword(password) {
        cy.get(this.passwordInput).clear().type(password)
        return this
    }
    clickLogin() {
        cy.get(this.loginButton).click()
        return this
    }
    login(email, password) {
        this.visit()
        this.fillEmail(email)
        this.fillPassword(password)
        this.clickLogin()
    }
    assertLoginSuccess() {
        cy.url().should('not.include', '/login')
        cy.get(this.logoutButton).should('be.visible')
    }
    assertLoginError(message) {
        cy.contains(message).should('be.visible')
    }
}
export default new LoginPage()