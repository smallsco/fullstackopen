describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'tuser',
      password: 'tpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login to Blog App')
    cy.contains('Username:')
    cy.get('#username')
    cy.contains('Password:')
    cy.get('#password')
    cy.get('#login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('tuser')
      cy.get('#password').type('tpassword')
      cy.get('#login').click()
      cy.contains('Welcome, Test User!')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tuser', password: 'tpassword' })
    })

    it('A blog can be created', function() {
      cy.contains('Show Form').click()
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://www.example.com')
      cy.get('#addBlog').click()

      // notification show up
      cy.contains('Added blog "Test Title" by author "Test Author"')

      // blog shows up
      cy.contains('Test Title - Test Author')
      cy.contains('View Details').click()
      cy.contains('http://www.example.com')
      cy.contains('0 likes')
      cy.contains('posted by Test User')
    })
  })

})