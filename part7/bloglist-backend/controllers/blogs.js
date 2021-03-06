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

// Add new comment to an existing blog
blogsRouter.post('/:id/comments', async (request, response) => {

  // Validate input
  if (!{}.hasOwnProperty.call(request.body, 'comment') || ({}.hasOwnProperty.call(request.body, 'comment') && request.body.comment === '')) {
    return response.status(400).json({ error: 'Missing comment property' })
  }

  // Look up the blog to comment on
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: 'Invalid blog ID' })
  }

  // Add the comment
  blog.comments = blog.comments.concat(request.body.comment)
  await blog.save()

  return response.status(201).json(blog)

})

// Add new blog
blogsRouter.post('/', async (request, response) => {

  // Ensure a valid token is provided
  // Note: missing or invalid tokens raise exceptions and so the errors are
  // returned by the middleware
  const decodedToken = jwt.verify(request.token, config.JWT_SECRET)

  // Validate input
  if (!{}.hasOwnProperty.call(request.body, 'title') || ({}.hasOwnProperty.call(request.body, 'title') && request.body.title === '')) {
    return response.status(400).json({ error: 'Missing title property' })
  }
  if (!{}.hasOwnProperty.call(request.body, 'url') || ({}.hasOwnProperty.call(request.body, 'url') && request.body.url === '')) {
    return response.status(400).json({ error: 'Missing url property' })
  }

  // Get user from JWT
  const loggedInUser = await User.findById(decodedToken.id)

  // Add the blog
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    user: loggedInUser._id,
    comments: []
  })
  const savedBlog = await blog.save()

  // Add the blog's ID to the user
  loggedInUser.blogs = loggedInUser.blogs.concat(savedBlog._id)
  await loggedInUser.save()

  // Populating saved blogs doesn't work, so re-fetch it
  const returnedBlog = await Blog
    .findById(savedBlog._id)
    .populate('user', { username: 1, name: 1 })
  return response.status(201).json(returnedBlog)
})

// Delete a blog
blogsRouter.delete('/:id', async (request, response) => {

  // Ensure a valid token is provided
  const decodedToken = jwt.verify(request.token, config.JWT_SECRET)

  // Look up the blog to delete
  const blogToRemove = await Blog.findById(request.params.id)
  if (!blogToRemove) {
    return response.status(204).end()
  }

  if (blogToRemove.user.toString() === decodedToken.id.toString()) {
    // If the current user and blog user are the same allow deletion to proceed
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  else {
    // If not then throw an error
    return response.status(400).json({ error: 'Only the user who posted the blog can delete it' })
  }
})

// Update an existing blog
blogsRouter.put('/:id', async (request, response) => {
  if (!{}.hasOwnProperty.call(request.body, 'title')) {
    return response.status(400).json({ error: 'Missing title property' })
  }
  if (!{}.hasOwnProperty.call(request.body, 'url')) {
    return response.status(400).json({ error: 'Missing url property' })
  }

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    comments: request.body.comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  return response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter