const jose = require('jose')
const jwtHelper = require('./jwtHelper')


const authValidate = async function (req, res, next) {
    console.log('Time: ', Date.now())

    jwt = getJWTFromRequest(req)
    if(!jwt) {
        return res.sendStatus(401).end()
    }

    try {
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, jwtHelper.Secret)
        console.log(protectedHeader)
        console.log(payload)
        console.log('Auth Validate: success')
    } catch(err) {
        console.log(err)
        console.log('Auth Validate: failed')
        return res.sendStatus(403).end()
    }
    
    next()
}


function getJWTFromRequest(req) {
    if(req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === 'Bearer') {
        console.log('JWT from header')
        return req.headers.authorization.split(" ")[1]
    }
    if(req.cookies.auth) {
        console.log('JWT from Cookies')
        return req.cookies.auth
    }
    if(req.query.auth) {
        console.log('JWT from query')
        return req.query.auth
    }
    return undefined
}

function getJWTClaims(req) {
    const jwt = getJWTFromRequest(req);
    return jose.decodeJwt(jwt);
}

module.exports = { authValidate, getJWTClaims, getJWTFromRequest}