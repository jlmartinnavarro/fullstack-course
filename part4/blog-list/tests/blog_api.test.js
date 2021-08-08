const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../../models/user')

beforeAll(async () => {
  await User.deleteMany({})
  const user = {
    username: 'test',
    name: 'test user',
    password: 'password'
  }

  await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.testBlogs)
})

describe('with the db initalized', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('viewing a single blog', () => {
  test('blog _id', async () => {
    const singleBlog = await helper.testBlogsInDb()

    expect(singleBlog[0].id).toBeDefined()
    expect(singleBlog[0]._id).toBe(undefined)
  })
})

describe('new blog', () => {
  test('adding a blog', async () => {
    const loginUser = {
      username: 'test',
      password: 'password'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Test',
      author: 'J D',
      url: 'fullstackopen.com/',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.testBlogsInDb()
    expect(blogs).toHaveLength(helper.testBlogs.length + 1)

    const titles = blogs.map(b => b.title)
    expect(titles).toContain('Test')
  })

  test('that when likes are missing are set to 0', async () => {
    const loginUser = {
      username: 'test',
      password: 'password'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Test',
      author: 'J D',
      url: 'fullstackopen.com/'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

  test('url is mandatory', async () => {
    const loginUser = {
      username: 'test',
      password: 'password'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)


    const newBlog = {
      title: 'Test',
      author: 'J D'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await helper.testBlogsInDb()

    expect(updatedBlogs).toHaveLength(helper.testBlogs.length)
  })

  test('token is mandatory', async () => {
    const newBlog = {
      title: 'Test',
      author: 'J D',
      url: 'fullstackopen.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await helper.testBlogsInDb()

    expect(updatedBlogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('delete of a blog', () => {
  test('status code 204 if id is valid', async () => {
    const loginUser = {
      username: 'test',
      password: 'password'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    const originalBblogs = await helper.testBlogsInDb()
    const blogToDelete = originalBblogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .expect(204)
    const blogs = await helper.testBlogsInDb()
    expect(blogs).toHaveLength(
      helper.testBlogs.length - 1
    )
  })
})

afterAll(() => {
  mongoose.connection.close
})