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
      const ipaUrl = `https://${process.env.DOMAIN}/api/packages/${package.fileName}?auth=${auth.getJWTFromRequest(req)}`
      template = template.toString().replace('{{ipa url}}', ipaUrl)
      template = template.replace('{{app bundle identifier}}', package.bundleIdentifier)
      template = template.replace('{{bundle version}}', package.versionName)
      template = template.replace('{{App Title}}', package.displayName)

      res.set('Content-Type', 'application/xml');
      res.send(template);
    });
})

router.get('/:uuid([a-z0-9\\-]{36}):ext(.ipa|.apk)', async(req, res) => {
    console.log('get IPA / APK')
    res.contentType("application/octet-stream");
    res.setHeader('Content-Disposition', 'attachment: filename="' + req.params.uuid + req.params.ext + '"')
    const filePath = global.__basedir + `/data/packages/${req.params.uuid}${req.params.ext}`
    var stream = fs.createReadStream(filePath);
    stream.pipe(res);
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
            'platform',
            'versionName',
            'buildVersion',
            'displayName',
            'bundleIdentifier',
            'fileName'],
        where: { displayName: req.body.name },
        order: [['id','DESC']]
    })

    res.send(versionHistory)

})


module.exports = router