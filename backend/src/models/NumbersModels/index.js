const { DataTypes } = require("sequelize");
const sequelize = require("../../../db");
const { HotelModals } = require("../HotelModals");
const NumbersModels = sequelize.define('number', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11 },
  nameNumber:{ type: DataTypes.STRING, allowNull: false },
  descriptionNumber:{ type: DataTypes.TEXT, defaultValue: null },
  imageNumber:{ type: DataTypes.STRING, defaultValue: null },
  typeNumber:{ type: DataTypes.STRING, allowNull: false },
  sleepingPlaces:{ type: DataTypes.DECIMAL(61), defaultValue: 0 },
  rooms:{ type: DataTypes.DECIMAL(61), defaultValue: 0 },
  quadrature:{ type: DataTypes.DECIMAL, defaultValue: 0, allowNull: false },
  guests:{ type: DataTypes.DECIMAL(61), defaultValue: 0 },
  tv:{ type: DataTypes.BOOLEAN, defaultValue: false },
  breakfast:{ type: DataTypes.BOOLEAN, defaultValue: false },
  wifi:{ type: DataTypes.BOOLEAN, defaultValue: false },
  swimmingPool:{ type: DataTypes.BOOLEAN, defaultValue: false },
  discount:{ type: DataTypes.DECIMAL(61, 2), defaultValue: 0.0 },
  boardingHouse:{ type: DataTypes.BOOLEAN, defaultValue: false },
  price:{ type: DataTypes.DECIMAL(61, 2), defaultValue: 0.00, allowNull: false },
  active:{ type: DataTypes.BOOLEAN, defaultValue: false },
  bal:{ type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0, allowNull: false },
  HotelModals:{ type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0, allowNull: false },
  count:{ type: DataTypes.DECIMAL(61), defaultValue: 0, allowNull: false },
  nutrition:{ type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0, allowNull: false },
  clean:{ type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0, allowNull: false },
  son:{ type: DataTypes.DECIMAL(61, 1), defaultValue: 0.0, allowNull: false },
  hotelId:{ type: DataTypes.BIGINT, defaultValue: null },
})
HotelModals.hasMany(NumbersModels, { as:'number' })
NumbersModels.belongsTo(HotelModals, { as: 'hotel' })
module.exports = { NumbersModels }