const express = require('express')
const { sequelize } = require('../db/connection')
const Package = require('../models/package')
const User = require('../models/user')
const auth = require('../auth')
const userConverter = require('../converter/userConverter')

const router = express.Router()
const pageSize = 20


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    const decodeJwt = auth.getJWTClaims(req)
    const user = userConverter.ConvertSeesionJWTToUser(decodeJwt)
    if(!checkPermission(user)) return res.sendStatus(403)

    next()
})

function checkPermission(user) {
    if(user.roles && user.roles.includes(User.UserRoles.USER)) return true
    return false
}


router.get('/', async (req, res) => {
    const offset = (req.query.page || 0) * pageSize

    var packages = await Package.findAll({ 
        order: [['createdAt', 'DESC']],
        limit: pageSize,
        offset: offset
    })

    res.send(packages)
})

router.get('/groupByDisplayName', async (req, res) => {
    var packages = await Package.findAll({ 
        group: 'displayName', 
        order: [[sequelize.literal('max(createdAt)'), 'DESC']]
    })

    res.send(packages)    
})

router.get('/distinctDisplayName', async (req, res) => {
    var packages = await Package.findAll({
        attributes: ['displayName', 'id'],
        distinct: true
    })

    res.send(packages)    
})



module.exports = router