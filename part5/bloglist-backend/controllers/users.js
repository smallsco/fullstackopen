// Third-Party Imports
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

// My Imports
const User = require('../models/user')

// List all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  return response.json(users.map(u => u.toJSON()))
})

// Add new user
usersRouter.post('/', async (request, response) => {

  // Username is validated by Mongoose.
  // Password must be validated here (Mongoose only gets the hash)
  if (!{}.hasOwnProperty.call(request.body, 'password')) {
    return response.status(400).json({ error: 'Please provide a password' })
  }
  if (request.body.password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  const u = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash: passwordHash
  })
  const result = await u.save()
  return response.status(201).json(result)
})

module.exports = usersRouter