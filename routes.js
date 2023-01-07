const express = require('express')
const router = express.Router();
const {authValidate} = require('./services/auth')
const login = require('./services/auth/login')
const packages = require('./services/packages')
const upload = require('./services/upload')


router.use((req, res, next) => {
    console.log('Time: ', Date.now(), " URL: ", req.url)
    next()
})


router.use('/login', login)
router.use(authValidate)
router.use('/packages', packages)
router.use('/upload', upload)

module.exports = router
