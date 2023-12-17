const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");
const {HotelModals} = require("../HotelModals");

const PromotionHotelModels = sequelize.define('promotionHotel', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    promotionHotel: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER(61, 2), defaultValue: 0.00, allowNull: false},
    status:{type: DataTypes.BOOLEAN, defaultValue: false},
    daysLeft: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
    daysHavePassed: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
    hotelId: { type: DataTypes.BIGINT, defaultValue: null },

})
HotelModals.hasMany(PromotionHotelModels, {as: "promotionHotel"});
PromotionHotelModels.belongsTo(HotelModals, {as: 'hotel'});
module.exports = {PromotionHotelModels}