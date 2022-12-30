require('dotenv').config()
const jwtHelper = require('./jwtHelper')
const User = require('../models/user')

var user = User.build({
    username: 'user1',
    password: '123456',
    roles: 'USER,ADMIN'
})
jwtHelper.generateJWT(user)