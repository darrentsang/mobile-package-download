const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roles: DataTypes.STRING
}, {
    indexes: [{
        unique: true,
        fields: ['username']
    }]
})

module.exports = User