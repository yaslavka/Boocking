const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");
const {UserModels} = require("../UserModels");
const {HotelModals} = require("../HotelModals");
const ReviewModels = sequelize.define('review',{
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    dignity:{type: DataTypes.TEXT, allowNull: false},
    minus:{type: DataTypes.TEXT, allowNull: false},
    comfort:{type: DataTypes.TEXT, allowNull: false},
    personal:{type: DataTypes.TEXT, allowNull: false},
    grade:{type: DataTypes.INTEGER(61, 0), defaultValue: 0.0, allowNull: false},
    userId: {type: DataTypes.BIGINT, defaultValue: null},
    hotelId:{type: DataTypes.BIGINT, defaultValue: null},
})
HotelModals.hasMany(ReviewModels, {as: "review"});
ReviewModels.belongsTo(HotelModals, {as: 'hotel'});
UserModels.hasMany(ReviewModels, {as: "review"});
ReviewModels.belongsTo(UserModels, {as: 'user'});
module.exports = {ReviewModels}