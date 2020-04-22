// Third-Party Imports
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// My Imports
const config = require('../utils/config')
const User = require('../models/user')

// Login
loginRouter.post('/', async (request, response) => {

  // Find user if exists and validate password
  const user = await User.findOne({ username: request.body.username })
  if (!(user && await bcrypt.compare(request.body.password, user.passwordHash))) {
    return response.status(401).json({ error: "Username or Password is incorrect" })
  }

  // Generate Token
  const jwt_user = {
    username: user.username,
    id: user._id
  }
  const jwt_token = jwt.sign(jwt_user, config.JWT_SECRET)

  // Return token
  return response.status(200).json({
    token: jwt_token,
    name: user.name,
    username: user.username,
    id: user._id
  })

})

module.exports = loginRouter