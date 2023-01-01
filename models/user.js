const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    roles: { 
        type: DataTypes.STRING,
        allowNull: false,
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