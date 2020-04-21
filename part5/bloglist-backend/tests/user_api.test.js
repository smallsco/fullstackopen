// Third-Party Dependencies
const mongoose = require('mongoose')
const supertest = require('supertest')

// My Dependencies
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

// Init Supertest
const api = supertest(app)

// Before tests run, drop the DB and reinsert fixture data
beforeAll(async () => {
  await User.deleteMany({})
  for (let u of helper.userFixtures) {
    await new User(u).save()
  }
})

describe('add new user endpoint', () => {

  test('can add a new user', async () => {
    const usersAtStart = await helper.usersInDb()

    // Add new user
    const newUser = {
      username: 'test',
      name: 'Test User',
      password: 's3cret'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Make sure it was added correctly
    expect(response.body.id).toBeDefined()
    expect(response.body.username).toBe(newUser.username)
    expect(response.body.name).toEqual(newUser.name)

    // Verify that the total number of users has increased by 1
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  })

  test('cannot add a user with the same username as another user', async () => {
    const usersAtStart = await helper.usersInDb()

    // Add new user
    const newUser = {
      username: 'test',
      name: 'Test User',
      password: 's3cret'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // Make sure the correct error message was returned
    expect(response.body.error).toEqual(expect.stringContaining('expected `username` to be unique'))

    // Verify that the total number of users is unchanged
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('cannot add a user without a username', async () => {
    const usersAtStart = await helper.usersInDb()

    // Add new user
    const newUser = {
      name: 'Test User',
      password: 's3cret'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // Make sure the correct error message was returned
    expect(response.body.error).toEqual(expect.stringContaining('Path `username` is required'))

    // Verify that the total number of users is unchanged
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('cannot add a user without a password', async () => {
    const usersAtStart = await helper.usersInDb()

    // Add new user
    const newUser = {
      username: 'nopassword',
      name: 'Test User'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // Make sure the correct error message was returned
    expect(response.body.error).toBe('Please provide a password')

    // Verify that the total number of users is unchanged
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('cannot add a user with a username < 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    // Add new user
    const newUser = {
      username: 'te',
      name: 'Test User',
      password: 's3cret'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // Make sure the correct error message was returned
    expect(response.body.error).toEqual(expect.stringContaining('is shorter than the minimum allowed length'))

    // Verify that the total number of users is unchanged
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('cannot add a user with a password < 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    // Add new user
    const newUser = {
      username: 'shortpassword',
      name: 'Test User',
      password: 's3'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // Make sure the correct error message was returned
    expect(response.body.error).toBe('Password must be at least 3 characters')

    // Verify that the total number of users is unchanged
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})