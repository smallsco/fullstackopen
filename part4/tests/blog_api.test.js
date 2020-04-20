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
      delete blog.id    // checked in a separate test
      return blog
    })

    const fixturesWithNullUsers = helper.blogFixtures.map(blog => {
      const newBlog = {...blog}
      newBlog.user = null  // these are faked in fixture data so they do not populate
      return newBlog
    })

    expect(body).toEqual(fixturesWithNullUsers)
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
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    // Add new blog
    const newBlog = {
      title: 'A New Blog',
      author: 'Carolin',
      url: 'http://www.fullstackopen.com',
      likes: 3
    }
    const post_response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Make sure it got an ID assigned
    expect(post_response.body.id).toBeDefined()

    // Remove the ID and make sure the rest of the properties have the right data
    expect(post_response.body.title).toEqual(newBlog.title)
    expect(post_response.body.author).toEqual(newBlog.author)
    expect(post_response.body.url).toEqual(newBlog.url)
    expect(post_response.body.likes).toEqual(newBlog.likes)
    expect(post_response.body.user).toEqual(usersAtStart[0].id)

    // Verify that the total number of blogs has increased by 1
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
  })

  test('cannot add a new blog without a JWT', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // Add new blog
    const newBlog = {
      title: 'A New Blog',
      author: 'Carolin',
      url: 'http://www.fullstackopen.com',
      likes: 3
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    // Make sure the user got an error message
    // (the message is set by the jwt library so we do not check for specific wording)
    expect(response.body.error).toBeDefined()

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('cannot add a new blog with an invalid JWT', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // Add new blog
    const newBlog = {
      title: 'A New Blog',
      author: 'Carolin',
      url: 'http://www.fullstackopen.com',
      likes: 3
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer this_is_an_invalid_token`)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    // Make sure the user got an error message
    // (the message is set by the jwt library so we do not check for specific wording)
    expect(response.body.error).toBeDefined()

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('can add a new blog without likes and they default to 0', async () => {
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    const newBlog = {
      title: 'Another New Blog',
      author: 'Jared',
      url: 'http://www.example.com'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('cannot add a new blog without a title', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    // attempting to add a blog without a title returns a 400 response
    const newBlog = {
      author: 'Joe',
      url: 'http://www.google.com'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // Make sure the user got an error message
    expect(response.body.error).toBe('Missing title property')

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('cannot add a new blog without a url', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    // attempting to add a blog without a url returns a 400 response
    const newBlog = {
      title: 'This should fail',
      author: 'Joe'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // Make sure the user got an error message
    expect(response.body.error).toBe('Missing url property')

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})

describe('delete blog endpoint', () => {

  test('can delete your own blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogIdToDelete = blogsAtStart[blogsAtStart.length - 1].id
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    await api
      .delete('/api/blogs/' + blogIdToDelete)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // the number of blogs in the system went down by 1
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
  })

  test('cannot delete another users blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogIdToDelete = blogsAtStart[0].id
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    const response = await api
      .delete('/api/blogs/' + blogIdToDelete)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // Make sure the user got an error message
    expect(response.body.error).toBe('Only the user who posted the blog can delete it')

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('deleting a non existing blog has no effect', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    await api
      .delete('/api/blogs/5e962f0db69261c21414f95d')
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})

describe('update blog endpoint', () => {

  test('can update an existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'An updated blog',
      author: 'William',
      url: 'http://www.bing.com',
      likes: 100,
    }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    // Make sure it uses the existing ID
    expect(response.body.id).toBe(blogsAtStart[0].id)

    // Remove the ID and make sure the rest of the properties have the right data
    delete response.body.id
    delete response.body.user
    expect(response.body).toEqual(newBlog)

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    // the old blog was overwritten
    delete blogsAtEnd[0].id
    delete blogsAtEnd[0].user
    expect(blogsAtEnd[0]).toEqual(newBlog)
  })

  test('cannot update an existing blog without a title', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // attempting to add a blog without a title returns a 400 response
    const newBlog = {
      author: 'Joe',
      url: 'http://www.google.com'
    }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    // Make sure the user got an error message
    expect(response.body.error).toBeDefined()

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('cannot update an existing blog without a url', async () => {
    const blogsAtStart = await helper.blogsInDb()

    // attempting to update a blog without a title returns a 400 response
    const newBlog = {
      title: 'This should fail',
      author: 'Joe'
    }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    // Make sure the user got an error message
    expect(response.body.error).toBeDefined()

    // the number of blogs in the system is unchanged
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('can update an existing blog without likes and they default to 0', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Another New Blog',
      author: 'Jared',
      url: 'http://www.example.com'
    }
    const response = await api.put('/api/blogs/' + blogsAtStart[0].id).send(newBlog)

    expect(response.body.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})