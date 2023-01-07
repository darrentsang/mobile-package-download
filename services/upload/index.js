const express = require('express')
const router = express.Router()
const UploadFile = require('../../models/uploadFile')
const path = require('path')
const formidable = require('formidable')
const fs = require('fs-extra')
const appInfoHelper = require('../packages/appInfoHelper')
const auth = require('../auth')
const userConverter = require('../../converter/userConverter')
const User = require('../../models/user')

const tmpUploadDir = process.env.DATA_PATH + '/tmp/upload'
const cachesPackagesDir = process.env.DATA_PATH + '/caches/packages'
const packageDir = process.env.DATA_PATH + '/packages'



router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    const decodeJwt = auth.getJWTClaims(req)
    const user = userConverter.ConvertSeesionJWTToUser(decodeJwt)
    if(!checkPermission(user)) return res.sendStatus(403)

    next()
})

function checkPermission(user) {
    if(user.roles && user.roles.includes(User.UserRoles.ADMIN)) return true
    return false
}



router.post('/', (req, res) => {
    if(!req.body.fileName) {
        console.log('Upload --> Missing filename')
        return res.sendStatus(422);
    }

    var fileExt = path.extname(req.body.fileName).toLowerCase()

    if(!['.ipa', '.apk'].includes(fileExt)) {
        console.log('Upload --> Invalid file extension', fileExt)
        return res.sendStatus(422);
    }

    UploadFile.create({
        fileName: req.body.fileName,
        fileExt: fileExt

    }).then(uploadFile => {
        return res.send(uploadFile)
    }).catch(err => {
        console.log('Upload ---> ', err)
        return res.send(400)
    })
     
})

router.post('/:uuid', (req, res) => {

    fs.mkdirsSync(tmpUploadDir);

    const form = formidable({
        keepExtensions: true,
        uploadDir: tmpUploadDir
    })
    console.log('tmpUploadDir --->', tmpUploadDir)


    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log('upload parse err ---> ', req.params.uuid, err)
            return res.sendStatus(400)
        }
        var tmpFilePath = files.file.filepath
        try {
            const uploadFileInfo = await UploadFile.findByPk(req.params.uuid)
            console.log('files ---> ', files)
            var newFilePath = moveTempFileToDataFolder(uploadFileInfo, tmpFilePath)
            var package = await convertAndSaveAppInfoToPackage(uploadFileInfo, newFilePath)
            res.send(package)
        }
        catch (err) {
            console.log('upload process err ---> ', err)

            return res.sendStatus(400)
        }
        finally {
            fs.unlink(tmpFilePath, (err) => {
                if (err) return console.log(err)

                console.log('TMP file deleted: ', tmpFilePath)
            })
        }
    })

})


function moveTempFileToDataFolder(uploadFileInfo, tempFilePath) {
    fs.mkdirsSync(packageDir)

    var fileName = uploadFileInfo.uuid + uploadFileInfo.fileExt
    var newPath = path.join(packageDir, fileName)
    console.log('uploadFileInfo -->', uploadFileInfo)
    console.log('tempFilePath --->', tempFilePath)
    fs.copyFileSync(tempFilePath, newPath)
    return newPath;
}

async function convertAndSaveAppInfoToPackage(uploadFile, packageFilePath) {
    const platform = getPlatform(uploadFile.fileExt)
    const appInfo = await appInfoHelper.extractAppInfo(packageFilePath)
    var package
    switch (platform){
        case 'ios':
            package = appInfoHelper.convertIOSAppInfoToPackage(appInfo)
            break;
        case 'android': 
            package =  appInfoHelper.convertAndroidppInfoToPackage(appInfo)
            break;       
    }
    package.fileName = path.basename(packageFilePath)
    
    await package.save()
    return package
}

function getPlatform(fileExt) {
    if(fileExt === '.ipa') return 'ios'
    if(fileExt === '.apk') return 'android'

    throw new Error("Invalid file extension: ", fileExt)
}


module.exports = router;