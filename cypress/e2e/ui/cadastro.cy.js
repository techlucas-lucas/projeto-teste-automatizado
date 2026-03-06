describe('Test Profile', () => {
  let data;
  const openRegisterPage = () => {
    cy.visit('https://front.serverest.dev/')
    cy.get('[data-testid="cadastrar"]').click()
  }
  before(() => {
    cy.fixture('dataTest').then((tData) => {
      data = tData
    });
  });

  it('Should validate required name', () => {
    openRegisterPage()
    cy.get('[data-testid="email"]').type(data.email)
    cy.get('[data-testid="password"]').type(data.password)
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Nome é obrigatório').should('be.visible')
  })
  it('Should validate required email', () => {
    openRegisterPage()
    cy.get('[data-testid="nome"]').type(data.name)
    cy.get('[data-testid="password"]').type(data.password)
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Email é obrigatório').should('be.visible')
  })
  it('Should validate required password', () => {
    openRegisterPage()
    cy.get('[data-testid="nome"]').type(data.name)
    cy.get('[data-testid="email"]').type(data.email)
    cy.get('[data-testid="cadastrar"]').click()
    cy.contains('Password é obrigatório').should('be.visible')
  })
  it('Should create admin profile successfully', () => {
    const uniqueEmail = `admin_${Date.now()}@qa.com`

    openRegisterPage()
    cy.get('[data-testid="nome"]').type(data.name)
    cy.get('[data-testid="email"]').type(uniqueEmail)
    cy.get('[data-testid="password"]').type(data.password)
    cy.get('[data-testid="checkbox"]').click()
    cy.get('[data-testid="cadastrar"]').click()

    cy.contains('Cadastro realizado com sucesso').should('be.visible')

    cy.request({
      method: 'GET',
      url: `https://serverest.dev/usuarios?email=${uniqueEmail}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.quantidade).to.eq(1)
      expect(response.body.usuarios[0].email).to.eq(uniqueEmail)
      expect(response.body.usuarios[0].administrador).to.eq('true')
    })
  })
})