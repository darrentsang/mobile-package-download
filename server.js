var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();
require('dotenv').config()

const {authValidate} = require('./auth')
const packages = require('./packages')
const upload = require('./upload')

app.use(cookieParser());
app.use(express.json());

app.use('/login', () => { console.log('Loaded /login')})
app.use(authValidate);
app.use('/packages', packages);
app.use('/upload', upload);


app.listen(5001, () => { console.log("Server started and listening port 5001...")})