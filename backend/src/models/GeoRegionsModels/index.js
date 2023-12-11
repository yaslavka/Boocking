const sequelize = require("../../../db");
const {GeoDistrictModels} = require("../GeoDistrictModels");
const {DataTypes} = require("sequelize");

const GeoRegionsModels = sequelize.define('geo_region', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    geo_region:{type: DataTypes.TEXT, defaultValue: null},
    geoDistrictId:{type: DataTypes.BIGINT, defaultValue: null}
})
GeoDistrictModels.hasMany(GeoRegionsModels, {as: 'geo_region'})
GeoRegionsModels.belongsTo(GeoDistrictModels, {as: 'geo_district'})
module.exports = {GeoRegionsModels}
