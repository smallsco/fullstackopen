// Third-Party Imports
const http = require('http')

// My Imports
const config = require('./utils/config')
const app = require('./app')

// Init and Start Server
const server = http.createServer(app)
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})