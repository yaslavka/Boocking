const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");
const {PromotionHotelModels} = require("../PromotionHotelModels");
const {PromotionModels} = require("../PromotionModels");
const {UserModels} = require("../UserModels");
const {GeoCityModels} = require("../GeoCityModels");

const HotelModals =sequelize.define('hotel',{
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    nameHotel:{type: DataTypes.STRING, allowNull: false},
    requisitesPay:{type: DataTypes.STRING, allowNull: false},
    phonePay:{type: DataTypes.STRING, allowNull: false},
    imageHotel:{type: DataTypes.STRING, allowNull: false},
    wifi:{type: DataTypes.BOOLEAN, defaultValue: false},
    breakfast:{type: DataTypes.BOOLEAN, defaultValue: false},
    swimmingPool:{type: DataTypes.BOOLEAN, defaultValue: false},
    discount:{type: DataTypes.DECIMAL(61, 2), defaultValue: 0.0},
    latitude:{type: DataTypes.DECIMAL(61, 15), defaultValue: 0.0},
    longitude:{type: DataTypes.DECIMAL(61, 15), defaultValue: 0.0},
    address:{type: DataTypes.STRING, allowNull: false},
    phone:{type: DataTypes.STRING, defaultValue: null},
    email:{type: DataTypes.STRING, defaultValue: null},
    bal: {type: DataTypes.DECIMAL(61, 2), defaultValue: 0.0},
    price:{type: DataTypes.DECIMAL(61, 2), defaultValue: 0.00, allowNull: false},
    NumberOfRooms:{type: DataTypes.DECIMAL, defaultValue: 0},
    rating:{type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0},
    distanceTo:{type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0},
    distanceOut:{type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0},
    distanceCenter:{type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0},
    distanceRailwayStation:{type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0},
    typeHotel:{type: DataTypes.STRING, defaultValue: null},
    typeOfRooms:{type: DataTypes.TEXT, defaultValue: null},
    descriptionHotel:{type: DataTypes.TEXT, defaultValue: null},
    active:{type: DataTypes.BOOLEAN, defaultValue: false},
    pay:{type: DataTypes.BOOLEAN, defaultValue: false},
    geoCityId: { type: DataTypes.BIGINT, defaultValue: null },
    userId: {type: DataTypes.BIGINT, defaultValue: null},
})
GeoCityModels.hasMany(HotelModals, { as: 'hotel' })
HotelModals.belongsTo(GeoCityModels, { as: 'geo_city' })
UserModels.hasMany(HotelModals, {as: "hotel"});
HotelModals.belongsTo(UserModels, {as: 'user'});

module.exports = {HotelModals}