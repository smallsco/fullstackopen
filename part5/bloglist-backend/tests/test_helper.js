// Third-Party Imports
const jwt = require('jsonwebtoken')

// My Imports
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

const blogFixtures = [
  {
    "title": "My First Blog",
    "author": "John",
    "url": "http://localhost:3003",
    "likes": 5,
    "user": "5e9ce38e8b0fa755c6f25dc3"
  },
  {
    "title": "Hello World",
    "author": "David",
    "url": "http://localhost:3003",
    "likes": 6,
    "user": "5e9ce4608b0fa755c6f25dc4"
  }
]

const userFixtures = [
  {
    "username": "root",
    "name": "Root User",
    "passwordHash": "$2b$10$DluTmKexscyInwxQHyedN.InVisAZbFMtC4X6GEfLF5TlBQ3yoCqe",
    "blogs": []
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getTokenForUser = (user) => {
  const jwt_user = {
    username: user.username,
    id: user.id
  }
  return jwt.sign(jwt_user, config.JWT_SECRET)
}

module.exports = {
  blogFixtures,
  blogsInDb,
  getTokenForUser,
  userFixtures,
  usersInDb
}