// Third-Party Imports
const mongoose = require('mongoose')

// Schema Definition
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String
})
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// Export Model
module.exports = mongoose.model('User', userSchema)