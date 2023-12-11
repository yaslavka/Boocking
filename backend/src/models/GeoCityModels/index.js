const sequelize = require("../../../db");
const { GeoRegionsModels } = require("../GeoRegionsModels");
const { DataTypes } = require("sequelize");

const GeoCityModels = sequelize.define('geo_city', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  geo_city:{ type: DataTypes.TEXT, defaultValue: null },
  geoRegionId:{ type: DataTypes.BIGINT, defaultValue: null }
})
GeoRegionsModels.hasMany(GeoCityModels, { as: 'geo_city' })
GeoCityModels.belongsTo(GeoRegionsModels, { as: 'geo_region' })
module.exports = { GeoCityModels }
