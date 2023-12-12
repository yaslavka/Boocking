const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");
const {HotelModals} = require("../HotelModals");
const ReviewModels = sequelize.define('review',{
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    dignity:{type: DataTypes.TEXT, allowNull: false},
    minus:{type: DataTypes.TEXT, allowNull: false},
    comfort:{type: DataTypes.TEXT, allowNull: false},
    politeness:{type: DataTypes.TEXT, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING, defaultValue: null},
    geo_city:{type: DataTypes.STRING, defaultValue: null},
    grade:{type: DataTypes.INTEGER(61, 0), defaultValue: 0.0, allowNull: false},
    hotelId:{type: DataTypes.BIGINT, defaultValue: null},
})
HotelModals.hasMany(ReviewModels, {as: "review"});
ReviewModels.belongsTo(HotelModals, {as: 'hotel'});
module.exports = {ReviewModels}