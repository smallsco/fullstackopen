describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'tuser',
      password: 'tpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to Blog App')
    cy.contains('Username:')
    cy.get('#username')
    cy.contains('Password:')
    cy.get('#password')
    cy.get('#login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tuser')
      cy.get('#password').type('tpassword')
      cy.get('#login').click()
      cy.contains('Welcome, Test User!')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login').click()
      cy.get('.error')
      .should('contain', 'Username or Password is incorrect')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'font-size', '20px')
      .and('have.css', 'border-style', 'solid')
      .and('have.css', 'border-radius', '5px')
      .and('have.css', 'padding', '10px')
      .and('have.css', 'margin-bottom', '10px')
    })

  })
})