const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

describe('with one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('123456', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation', async () => {
    const originalUsers = await helper.testUsersInDB()

    const newUser = {
      username: 'newuser',
      name: 'Name of User',
      password: '123456'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const users = await helper.testUsersInDB()
    expect(users).toHaveLength(originalUsers.length + 1)

    const usernames = users.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('if duplicated username creation fails with correct statuscode and message', async () => {
    const usersAtStart = await helper.testUsersInDB()

    const newUser = {
      username: 'root',
      password: '123456'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.testUsersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close
})