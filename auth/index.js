const express = require('express')
const { STATUS_CODES } = require('http')
const jose = require('jose')
const jwtHelper = require('./jwtHelper')
const router = express.Router()

router.use(async (req, res, next) => {
    console.log('Time: ', Date.now())

    jwt = getJWTfromRequest(req)
    if(!jwt) {
        return res.status(401).end()
    }

    try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, jwtHelper.Secret)
        console.log(protectedHeader)
        console.log(payload)
        console.log('Auth Check: success')
    } catch(err) {
        console.log(err)
        console.log('Auth Check: failed')
        //return res.redirect("/login")
        return res.status(401).end()
    }
    next()
})

function getJWTfromRequest(req) {
    if(req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === 'Bearer') {
        return req.headers.authorization.split(" ")[1]
    }
    if(req.cookies.authorization) {
        return req.cookies.authorization
    }
    if(req.query.jwt) {
        return req.query.jwt
    }
    return undefined
}

module.exports = router