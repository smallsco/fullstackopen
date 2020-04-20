// Third-Party Imports
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

// My Imports
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

// Connect to DB
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// Pre-Routing Middleware
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

// Routes
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

// Post-Routing Middleware
app.use(middleware.errorHandler)


module.exports = app