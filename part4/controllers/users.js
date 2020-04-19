// Third-Party Imports
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

// My Imports
const User = require('../models/user')

// List all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  return response.json(users.map(u => u.toJSON()))
})

// Add new user
usersRouter.post('/', async (request, response) => {
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