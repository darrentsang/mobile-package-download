const { Sequelize, Model, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_CONNECTION_SQLITE_PATH
});

console.log('db connection path--->', process.env.DB_CONNECTION_SQLITE_PATH)

module.exports = { sequelize }