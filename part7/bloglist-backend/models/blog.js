// Third-Party Imports
const mongoose = require('mongoose')

// Schema Definition
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: String,
  likes: Number,
  comments: [String]
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export Model
module.exports = mongoose.model('Blog', blogSchema)