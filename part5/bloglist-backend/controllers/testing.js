// Third-Party Imports
const testingRouter = require('express').Router()

// My Imports
const Blog = require('../models/blog')
const User = require('../models/user')

// Reset database to a blank slate
testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  return response.status(204).end()
})

module.exports = testingRouter