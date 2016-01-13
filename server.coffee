dotenv  = require('dotenv').load()
express = require 'express'
server  = express()
server.use express.static __dirname + '/public'
server.listen process.env.PORT, () ->
    console.log 'server running on port ' + process.env.PORT
