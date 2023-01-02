const express = require('express')
const { sequelize, Op } = require('../../utils/db/connection')
const Package = require('../../models/package')
const User = require('../../models/user')
const auth = require('../auth')
const userConverter = require('../../converter/userConverter')

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


router.get('/overview', async(req, res) => {
    var uniquePackageList = await Package.findAll({ 
        attributes: [
            'displayName',
            [sequelize.fn("MAX", sequelize.col("id")), "id"]],
        group: 'displayName'
    })

    var packages = await Package.findAll({
        where: {
            id: uniquePackageList.map( i => i.id)
        },
        order: [['createdAt', 'DESC']]
    })


    res.send(packages)    
})

router.get('/:displayName/versionHistory', async(req, res) => {

    var versionHistory = await Package.findAll({
        attributes: [
            'versionName',
            'buildVersion',
            'displayName',
            'bundleIdentifier',
            'fileName'],
        where: { displayName: req.params.displayName },
        order: [['versionName', 'DESC'], ['id','DESC']]
    })

    res.send(versionHistory)

})



module.exports = router