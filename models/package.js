const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/connection')

const Package = sequelize.define("Package", {
    platform: DataTypes.ENUM('ios', 'android'),
    versionName: DataTypes.STRING,
    buildVersion: DataTypes.STRING,
    displayName: DataTypes.STRING,
    bundleIdentifier: DataTypes.STRING,
    icon: DataTypes.TEXT
}, {
    indexes: [
        {
            fields: ['displayName']
        },
        {
            fields: ['versionName']
        },
        {
            fields: ['platform']
        },
        {
            fields: ['createdAt']
        }
    ]
})

module.exports = { Package }