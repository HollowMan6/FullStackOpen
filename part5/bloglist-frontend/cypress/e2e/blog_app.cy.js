describe('Note ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
  
      cy.contains('root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'root logged in')
    })
  })

  describe('Blog app', function() {
  
    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('root')
        cy.get('#password').type('sekret')
        cy.get('#login-button').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('new note').click()
        cy.get('#title').type('Hi There')
        cy.get('#author').type('Sl. J.')
        cy.get('#url').type('http://localhost:3000/')
        cy.get('#create-button').click()
        cy.contains('Hi There')
      })

      it('users can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').eq(0).click()
      })

      it('users can delete a blog', function() {
        cy.contains('view').click()
        cy.contains('delete').click()
      })

      it('blogs are ordered by likes', function() {
        cy.get('.blog').eq(0).should('contain', 'First class tests Robert')
        cy.get('.blog').eq(1).should('contain', 'React patterns')
      })
    })
  
  })

  // describe('when logged in', function() {
  //   beforeEach(function() {
  //     cy.login({ username: 'mluukkai', password: 'salainen' })
  //   })

  //   it('a new note can be created', function() {

  //   })

  //   describe('and some notes exists', function () {
  //     beforeEach(function () {
  //       cy.createNote({ content: 'first note', important: false })
  //       cy.createNote({ content: 'second note', important: false })
  //       cy.createNote({ content: 'third note', important: false })
  //     })

  //     it('one of those can be made important', function () {
  //       cy.contains('second note').parent().find('button').as('theButton')

  //       cy.get('@theButton').click()
  //       cy.get('@theButton').should('contain', 'make not important')
  //     })
  //   })
  // })
})