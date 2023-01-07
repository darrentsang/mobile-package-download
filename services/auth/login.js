const express = require('express')
const router = express.Router();
const jwtHelper = require('./jwtHelper')
const {User} = require('../../models/user')

router.post('/', async (req, res) => {
    const reqUsername = req.body.username
    const reqPassword = req.body.password

    if( !reqUsername || !reqPassword ) {
        return res.sendStatus(422).end()
    }

    try {
        const loginUser = await User.findOne({
            where: {
                username: reqUsername
            }
        })

        if(loginUser === null) { 
            console.log('Login User not found')
            return res.send({
                returnCode: ReturnCode.FAILED
            })
        }   

        if(loginUser.password !== reqPassword) {
            console.log('Login password not match')
            return res.send({
                returnCode: ReturnCode.FAILED
            })
        }

        const jwt = await jwtHelper.generateJWT(loginUser)
        res.cookie("auth", jwt, {
            httpOnly: true,
            secure: true
        })

        return res.send({
            returnCode: ReturnCode.SUCCESS,
            sessionJWT: jwt
        })

    } catch (e) {

        console.log('Login error', e)
        return res.send({
            returnCode: ReturnCode.FAILED
        })
    }
})

const ReturnCode = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
}

module.exports = router