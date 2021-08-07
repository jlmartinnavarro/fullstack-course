const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
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
    const singleBlog = await helper.blogsInDb()

    expect(singleBlog[0].id).toBeDefined()
    expect(singleBlog[0]._id).toBe(undefined)
  })
})

describe('addition of a new blog', () => {
  test('adding a blog', async () => {
    const newBlog = {
      title: 'Test',
      author: 'J D',
      url: 'fullstackopen.com/',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogs.map(b => b.title)
    expect(titles).toContain('Test')
  })

  test('that when likes are missing are set to 0', async () => {
    const newBlog = {
      title: 'Test',
      author: 'J D',
      url: 'fullstackopen.com/'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

  test('url is mandatory', async () => {
    const newBlog = {
      title: 'Test',
      author: 'J D'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('delete of a blog', () => {
  test('status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const titles = blogs.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})
afterAll(() => {
  mongoose.connection.close
})