const {User} = require('../models/user')

function ConvertSeesionJWTToUser(decodedJwt) {
    return User.build({
        username: decodedJwt.username,
        roles: decodedJwt.roles
    })
}

module.exports = { ConvertSeesionJWTToUser }