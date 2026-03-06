describe('Login Test', () => {
  let data;
  before(() => {
    cy.fixture('dataTest').then((tData) => {
      data = tData;
    });
  });

  it('Login com erro', () => {
    cy.visit('https://front.serverest.dev/')
    cy.get('[data-testid="email"]').type('teste@lucas.com')
    cy.get('[data-testid="senha"]').type('1')
    cy.get('[data-testid="entrar"]').click()
    cy.get('.alert > :nth-child(2)').contains('Email e/ou senha inválidos')
  })
  it('Login com sucesso', () => {
    cy.login(data.email, data.password)
  })
})