require('dotenv').config()
const {sequelize} = require('./utils/db/connection')
const {User, UserRoles} = require('./models/user')
const {Package} = require('./models/package')
const {UploadFile} = require('./models/uploadFile')


async function syncTableSchema() {
    await sequelize.sync();
}
async function addDefualtUser() {
    if((await User.findAll()).length > 0) {
        return console.log("No default user created")
    }

    var user = await User.create({
        username: "user",
        password: "123456",
        roles: [UserRoles.USER]
    })
    console.log("Created User with USER access right")

    var admin = await User.create({
        username: "admin",
        password: "123456",
        roles: [UserRoles.ADMIN] 
    })
    console.log("Created Admin with ADMIN access right")

    var superUser = await User.create({
        username: "super",
        password: "123456",
        roles: [UserRoles.USER, UserRoles.ADMIN] 
    })
    console.log("Created Super with USER and Admin access right")
}


async function init() {
    await syncTableSchema();
    await addDefualtUser();

}

init()


