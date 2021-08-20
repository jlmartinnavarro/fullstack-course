describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User',
      username: 'root',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in').click()
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-btn').click()

      cy.contains('logged in')

      cy.get('.notification')
        .should('contain', 'Welcome')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-btn').click()

      cy.get('.notification')
        .should('contain', 'wrong')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'root',
        password: 'password',
      }).then((response) => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be added', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('http://url.com')
      cy.get('#likes').type(3)
      cy.get('#add-blog').click()

      cy.contains('Testing Title')
    })

    describe('The blog exist', function () {
      beforeEach(function () {
        const body = {
          title: 'Title',
          author: 'Author',
          url: 'http://url.com',
          likes: 3,
        }
        cy.createBlog(body)
      })

      it('user likes a blog', function () {
        cy.contains('view').click()
        cy.get('.update').click()
      })

      it('user who has created the blog can delete it', function () {
        cy.contains('view').click()
        cy.get('.delete').click()
        cy.on('windows:confirm', () => true)
      })

      describe('add blogs', function () {
        beforeEach(function () {
          const blog1 = {
            title: 'Title',
            author: 'Author',
            url: 'http://url.com',
            likes: 3,
          }
          const blog2 = {
            title: 'Title',
            author: 'Author',
            url: 'http://url.com',
            likes: 1,
          }
          const blog3 = {
            title: 'Title',
            author: 'Author',
            url: 'http://url.com',
            likes: 6,
          }
          cy.createBlog(blog1)
          cy.createBlog(blog2)
          cy.createBlog(blog3)
        })

        it('the first blog has max likes', function () {
          cy.contains('view').click()
          cy.get('.update').parent().as('likeblock')
          cy.get('@likeblock').contains(6)
        })
      })
    })
  })
})