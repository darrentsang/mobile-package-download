const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db/connection')

const UploadFile = sequelize.define('UploadFile', {
    uuid: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fileName: { type: DataTypes.STRING, allowNull: false },
    fileExt: { type: DataTypes.STRING, allowNull: false }
})

module.exports = UploadFile