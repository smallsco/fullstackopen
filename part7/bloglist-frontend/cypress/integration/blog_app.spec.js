describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'tuser',
      password: 'tpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    const user2 = {
      name: 'Test User2',
      username: 'tuser2',
      password: 'tpassword2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tuser', password: 'tpassword' })
    })

    it('A blog can be created', function() {
      // show the add blog form
      cy.contains('Show Form').click()

      // fill out the add blog form
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://www.example.com')
      cy.get('#addBlog').click()

      // notification shows up
      cy.contains('Added blog "Test Title" by author "Test Author"')

      // blog shows up
      cy.contains('Test Title - Test Author').click()
      cy.contains('http://www.example.com')
      cy.contains('0 likes')
      cy.contains('posted by Test User')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.addBlog({ title: 'Test Title', author: 'Test Author', url: 'http://www.example.com' })
      })

      it('a blog can be liked', function() {
        // like the blog
        cy.contains('Test Title - Test Author').click()
        cy.contains('Like!').click()

        // blog was liked
        cy.contains('1 likes')
      })

      it('a blog can be deleted by the user who created it', function() {
        // delete the blog
        cy.contains('Test Title - Test Author').click()
        cy.contains('Delete').click()

        // blog does not exist
        cy.contains('Test Title - Test Author').should('not.exist')
      })

      it('a blog cannot be deleted by a user who did not create it', function() {
        // log in as another user
        cy.login({ username: 'tuser2', password: 'tpassword2' })

        // the delete button does not exist
        cy.contains('Test Title - Test Author').click()
        cy.contains('Delete').should('not.exist')
      })

      it('multiple blogs are listed by their like count in descending order', function() {
        // add 2 more blogs. the DB order looks like:
        // test 1 - 0 likes
        // test 2 - 2 likes
        // test 3 - 1 likes
        cy.addBlog({ title: 'Test Title 2', author: 'Test Author 2', url: 'http://www.example.com', likes: 2 })
        cy.addBlog({ title: 'Test Title 3', author: 'Test Author 3', url: 'http://www.example.com', likes: 1 })

        // handy references for each of the blogs
        cy.get('#bloglist').children().eq(0).as('first')
        cy.get('#bloglist').children().eq(1).as('second')
        cy.get('#bloglist').children().eq(2).as('third')

        // the order on the page is sorted by likes descending
        cy.get('@first').contains('Test Title 2 - Test Author 2')
        cy.get('@second').contains('Test Title 3 - Test Author 3')
        cy.get('@third').contains('Test Title - Test Author')
      })
    })

  })

})