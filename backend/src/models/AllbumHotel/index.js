const { DataTypes } = require("sequelize");
const sequelize = require("../../../db");
const { HotelModals } = require("../HotelModals");

const AlbumHotel= sequelize.define('albumHotel', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11 },
  albumHotel:{ type: DataTypes.STRING, allowNull: false },
  hotelId:{ type: DataTypes.BIGINT, defaultValue: null },
})
HotelModals.hasMany(AlbumHotel, { as: "albumHotel" });
AlbumHotel.belongsTo(HotelModals, { as: 'hotel' });

module.exports = { AlbumHotel }