// Third-Party Imports
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

// My Imports
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

// List all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs.map(blog => blog.toJSON()))
})

// JWT Helper
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// Add new blog
blogsRouter.post('/', async (request, response) => {

  // Ensure a valid token is provided
  // Note: missing or invalid tokens raise exceptions and so the errors are
  // returned by the middleware
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.JWT_SECRET)

  // Validate input
  if (!request.body.hasOwnProperty('title')) {
    return response.status(400).json({error: "Missing title property"})
  }
  if (!request.body.hasOwnProperty('url')) {
    return response.status(400).json({error: "Missing url property"})
  }

  // Get user from JWT
  const loggedInUser = await User.findById(decodedToken.id)

  // Add the blog
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    user: loggedInUser._id
  })
  const savedBlog = await blog.save()

  // Add the blog's ID to the user
  loggedInUser.blogs = loggedInUser.blogs.concat(savedBlog._id)
  await loggedInUser.save()

  return response.status(201).json(savedBlog)
})

// Delete a blog
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).end()
})

// Update an existing blog's like count
blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.hasOwnProperty('title')) {
    return response.status(400).json({error: "Missing title property"})
  }
  if (!request.body.hasOwnProperty('url')) {
    return response.status(400).json({error: "Missing url property"})
  }

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
  return response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter