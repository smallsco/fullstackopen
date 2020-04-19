// My Dependencies
const Blog = require('../models/blog')
const User = require('../models/user')

const blogFixtures = [
  {
    "title": "My First Blog",
    "author": "John",
    "url": "http://localhost:3003",
    "likes": 5
  },
  {
    "title": "Hello World",
    "author": "David",
    "url": "http://localhost:3003",
    "likes": 6
  }
]

const userFixtures = [
  {
    "username": "root",
    "name": "Root User",
    "passwordHash": "$2b$10$DluTmKexscyInwxQHyedN.InVisAZbFMtC4X6GEfLF5TlBQ3yoCqe"
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

module.exports = {blogFixtures, blogsInDb, userFixtures, usersInDb}