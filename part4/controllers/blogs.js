// Third-Party Imports
const blogsRouter = require('express').Router()

// My Imports
const Blog = require('../models/blog')

// List all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs.map(blog => blog.toJSON()))
})

// Add new blog
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  return response.status(201).json(result)
})

module.exports = blogsRouter