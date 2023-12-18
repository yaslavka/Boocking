const sequelize = require("../../../db");
const {UserModels} = require("../UserModels");
const {HotelModals} = require("../HotelModals");
const { DataTypes } = require("sequelize");


const FavoritesModels = sequelize.define('favorite',{
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    status:{type: DataTypes.BOOLEAN, defaultValue: false},
    hotelId:{type: DataTypes.BIGINT, defaultValue: null},
    userId:{type: DataTypes.BIGINT, defaultValue: null},
})
HotelModals.hasMany(FavoritesModels, { as: 'favorite' })
FavoritesModels.belongsTo(HotelModals, { as: 'hotel' })
UserModels.hasMany(FavoritesModels, { as: 'favorite' })
FavoritesModels.belongsTo(UserModels, { as: 'user' })
module.exports = {FavoritesModels}