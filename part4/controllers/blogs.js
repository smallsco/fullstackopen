// Third-Party Imports
const blogsRouter = require('express').Router()

// My Imports
const Blog = require('../models/blog')
const User = require('../models/user')

// List all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs.map(blog => blog.toJSON()))
})

// Add new blog
blogsRouter.post('/', async (request, response) => {
  if (!request.body.hasOwnProperty('title')) {
    return response.status(400).json({error: "Missing title property"})
  }
  if (!request.body.hasOwnProperty('url')) {
    return response.status(400).json({error: "Missing url property"})
  }

  const allUsers = await User.find({})
  const firstUser = allUsers[0]

  // Add the blog
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    user: firstUser._id
  })
  const savedBlog = await blog.save()

  // Add the blog's ID to the user
  firstUser.blogs = firstUser.blogs.concat(savedBlog._id)
  await firstUser.save()

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