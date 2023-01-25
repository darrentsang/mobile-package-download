const serverless = require('serverless-http');
var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
require('dotenv').config()
global.__basedir = __dirname;
const routes = require('./routes')

app.use(cookieParser())
app.use(express.json())

app.use('/api', routes)


// app.listen(5001, () => { console.log("Server started and listening port 5001...")})
module.exports.handler = serverless(app)