// Third-Party Imports
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// My Imports
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

// Connect to DB
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useFindAndModify', false)

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)


module.exports = app