const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");
const {GeoCityModels} = require("../GeoCityModels");
const UserModels = sequelize.define('user',{
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    username: {type: DataTypes.STRING, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING, defaultValue: null},
    balance: {type: DataTypes.INTEGER(61, 2), defaultValue: 0.00, allowNull: false},
    description: {type: DataTypes.TEXT, defaultValue: null},
    isAdmin:{type: DataTypes.BOOLEAN, defaultValue: false},
    isManager:{type: DataTypes.BOOLEAN, defaultValue: false},
    geoCityId: { type: DataTypes.BIGINT, defaultValue: null },
    inviter_id: {type: DataTypes.BIGINT, defaultValue: null},
})
GeoCityModels.hasMany(UserModels, { as: 'user' })
UserModels.belongsTo(GeoCityModels, { as: 'geo_city' })
UserModels.belongsTo(UserModels, {foreignKey: 'inviter_id', as: 'inviter'})
module.exports = {UserModels}