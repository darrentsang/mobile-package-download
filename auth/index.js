const jose = require('jose')
const jwtHelper = require('./jwtHelper')

const authValidate = async function (req, res, next) {
    console.log('Time: ', Date.now())

    jwt = getJWTfromRequest(req)
    if(!jwt) {
        return res.status(401).end()
    }

    try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, jwtHelper.Secret)
        console.log(protectedHeader)
        console.log(payload)
        console.log('Auth Validate: success')
    } catch(err) {
        console.log(err)
        console.log('Auth Validate: failed')
        //return res.redirect("/login")
        return res.status(403).end()
    }
    
    next()
}

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

module.exports = { authValidate }