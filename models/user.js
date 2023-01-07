const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db/connection');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    roles: { 
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('roles');
            return rawValue ? rawValue.split(',') : null;
        },
        set(value) {
            this.setDataValue('roles', value.join(','));
        }
    }
}, {
    indexes: [{
        unique: true,
        fields: ['username']
    }]
})

const UserRoles = {
    USER: 'USER',
    ADMIN: 'ADMIN'
}

module.exports = { User, UserRoles}