const { DataTypes } = require("sequelize");
const sequelize = require("../../../db");
const { UserModels } = require('../UserModels')

const PayHistoryModals = sequelize.define('payHistory', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11 },
  typePay:{ type: DataTypes.TEXT, defaultValue: null },
  sum:{ type: DataTypes.STRING, allowNull: false },
  status:{ type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.BIGINT, defaultValue: null },
})

UserModels.hasMany(PayHistoryModals, { as: "payHistory" });
PayHistoryModals.belongsTo(UserModels, { as: 'user' });

module.exports = { PayHistoryModals }