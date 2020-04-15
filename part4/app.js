// Third-Party Imports
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// My Imports
const config = require('./utils/config')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

// Connect to DB
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/blogs', blogsRouter)


module.exports = app