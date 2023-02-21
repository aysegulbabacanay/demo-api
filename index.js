// Configure environment variables from .env file
require('dotenv').config()

// Require the Express server object
const server = require('./server');

// Get server port
const port = process.env.PORT;

// Listen on configured port
server.listen(port, () => {

    console.log(`Server listening on port ${port}...`)
})