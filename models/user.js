const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roles: { 
        type: DataTypes.STRING,
        get() {
            const rawValue = this.getDataValue('roles');
            return rawValue ? rawValue.split(',') : null;
          }
    }
}, {
    indexes: [{
        unique: true,
        fields: ['username']
    }]
})

module.exports = User