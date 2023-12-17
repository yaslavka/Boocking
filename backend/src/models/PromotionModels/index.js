const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");

const PromotionModels = sequelize.define('promotion', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    promotion: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER(61, 2), defaultValue: 0.00, allowNull: false},
})
module.exports = {PromotionModels}