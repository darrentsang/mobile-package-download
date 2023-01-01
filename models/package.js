const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/connection')

const Package = sequelize.define("Package", {
    platform: { type: DataTypes.ENUM('ios', 'android'), allowNull: false},
    versionName: { type: DataTypes.STRING, allowNull: false },
    buildVersion: { type: DataTypes.STRING, allowNull: false },
    displayName: { type: DataTypes.STRING, allowNull: false },
    bundleIdentifier: { type: DataTypes.STRING, allowNull: false },
    icon: { type: DataTypes.TEXT, allowNull: false },
    fileName: { type: DataTypes.STRING, allowNull: false }
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

module.exports = Package