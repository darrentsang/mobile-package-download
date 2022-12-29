require('dotenv').config()
const {sequelize} = require('./db/connection')
const {User} = require('./models/user')
const {Package} = require('./models/package')


async function syncTableSchema() {
    await sequelize.sync();
}

syncTableSchema();