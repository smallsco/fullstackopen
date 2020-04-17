// Third-Party Dependencies
const mongoose = require('mongoose')
const supertest = require('supertest')

// My Dependencies
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

// Init Supertest
const api = supertest(app)

// Before tests run, drop the DB and reinsert fixture data
beforeAll(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.blogFixtures) {
    await new Blog(blog).save()
  }
})

describe('list all blogs endpoint', () => {

  // also implies the amount of blogs are correct
  test('the blogs contain the fixture data', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const body = response.body.map(blog => {
      delete blog.id
      return blog
    })

    expect(body).toEqual(helper.blogFixtures)
  })

  test('the blogs contain an "id" property', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('add new blog endpoint', () => {

  test('can add a new blog', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // Add new blog
    const newBlog = {
      title: 'A New Blog',
      author: 'Carolin',
      url: 'http://www.fullstackopen.com',
      likes: 3
    }
    const post_response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Make sure it got an ID assigned
    expect(post_response.body.id).toBeDefined()

    // Remove the ID and make sure the rest of the properties have the right data
    delete post_response.body.id
    expect(post_response.body).toEqual(newBlog)

    // Verify that the total number of blogs has increased by 1
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
  })

  test('can add a new blog without likes and they default to 0', async () => {
    const newBlog = {
      title: 'Another New Blog',
      author: 'Jared',
      url: 'http://www.example.com'
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('cannot add a new blog without a title', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // attempting to add a blog without a title returns a 400 response
    const newBlog = {
      author: 'Joe',
      url: 'http://www.google.com'
    }
    const post_response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    // Make sure the user got an error message
    expect(post_response.body.error).toBeDefined()

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('cannot add a new blog without a url', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // attempting to add a blog without a title returns a 400 response
    const newBlog = {
      title: 'This should fail',
      author: 'Joe'
    }
    const post_response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    // Make sure the user got an error message
    expect(post_response.body.error).toBeDefined()

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})