require('dotenv').config()
const jwtHelper = require('./jwtHelper')
const jose = require('jose')
const User = require('../models/user')
const {test} = require('node:test')
const assert = require('node:assert')

test('Generate JWT test', async (t) => {
    var user = User.build({
        username: 'user1',
        password: '123456',
        roles: 'USER,ADMIN'
    })
    var jwt = await jwtHelper.generateJWT(user)
    var decodedJwt = jose.decodeJwt(jwt)
    
    assert.strictEqual(decodedJwt.username, user.username)
    assert.notStrictEqual(decodedJwt.roles, user.roles)
})
