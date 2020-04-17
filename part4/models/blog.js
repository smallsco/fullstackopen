// Third-Party Imports
const mongoose = require('mongoose')

// Schema Definition
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export Model
module.exports = Blog = mongoose.model('Blog', blogSchema)