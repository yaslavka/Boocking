const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");
const {NumbersModels} = require("../NumbersModels");

const AlbumNumbers= sequelize.define('albumNumber', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    albumNumber:{type: DataTypes.STRING, allowNull: false},
    numberId:{type: DataTypes.BIGINT, defaultValue: null},
})
NumbersModels.hasMany(AlbumNumbers, {as: "albumNumber"});
AlbumNumbers.belongsTo(NumbersModels, {as: 'number'});

module.exports = {AlbumNumbers}