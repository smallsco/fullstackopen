// Third-Party Imports
const mongoose = require('mongoose')

// Schema Definition
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Export Model
module.exports = Blog = mongoose.model('Blog', blogSchema)