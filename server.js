var express = require('express')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var app = express()
require('dotenv').config()
global.__basedir = __dirname;

const {authValidate} = require('./services/auth')
const login = require('./services/auth/login')
const packages = require('./services/packages')
const upload = require('./services/upload')


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/login', login)
app.use(authValidate)
app.use('/packages', packages)
app.use('/upload', upload)


app.listen(5001, () => { console.log("Server started and listening port 5001...")})