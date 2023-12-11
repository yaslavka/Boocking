const sequelize = require("../../../db");
const {DataTypes} = require("sequelize");

const GeoDistrictModels =sequelize.define('geo_district',{
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    geo_district:{type: DataTypes.TEXT, defaultValue: null},
    geo_district_images:{type: DataTypes.STRING, defaultValue: null},
})
module.exports = {GeoDistrictModels}
