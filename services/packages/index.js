const express = require('express')
const { sequelize } = require('../../utils/db/connection')
const Package = require('../../models/package')
const User = require('../../models/user')
const auth = require('../auth')
const userConverter = require('../../converter/userConverter')
const fs = require('fs-extra')

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

router.get('/:id(\\d+)', async (req, res) => {

    var package = await Package.findByPk(req.params.id)

    res.send(package)
})
router.get('/:id(\\d+).plist', async (req, res) => {
    var package = await Package.findByPk(req.params.id)
    fs.readFile(global.__basedir + '/template.plist', function (err, template) {
      if (err) {
        throw err; 
      }
      template = template.toString().replace('{{public share link for you ipa}}', package.fileName)
      template = template.replace('{{app bundle identifier}}', package.bundleIdentifier)
      template = template.replace('{{bundle version}}', package.versionName)
      template = template.replace('{{App Title}}', package.displayName)

      res.set('Content-Type', 'text/xml');
      res.send(template);
    });
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

router.post('/versionHistory', async(req, res) => {
    console.log(req.body.name)
    var versionHistory = await Package.findAll({
        attributes: [
            'id',
            'versionName',
            'buildVersion',
            'displayName',
            'bundleIdentifier',
            'fileName'],
        where: { displayName: req.body.name },
        order: [['versionName', 'DESC'], ['id','DESC']]
    })

    res.send(versionHistory)

})


module.exports = router