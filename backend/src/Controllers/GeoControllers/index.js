const {GeoDistrictModels} = require("../../models/GeoDistrictModels");
const {GeoRegionsModels} = require("../../models/GeoRegionsModels");
const { GeoCityModels } = require("../../Models/GeoCityModels");

class GeoControllers{
    async geoCities(req, res){
        const cities = await GeoCityModels.findAndCountAll({limit: 6})
        if (!cities.rows.length){
            return res.status(409).json({message: ''})
        }else {
            const region =await GeoRegionsModels.findAll({where:{id:cities.rows.map(i=>i.geoRegionId)}})
            if (!region.length){
                return res.status(409).json({message: ''})
            }else {
                const geo = await GeoDistrictModels.findAll({where: {id:region.map(i=>i.geoDistrictId)}, include:[{model:GeoRegionsModels, as:'geo_region', include:[{model: GeoCityModels, as: 'geo_city'}]}]})
                if (!geo.length){
                    return res.status(409).json({message: ''})
                }else {

                }
            }
        }
    }
}
module.exports = new GeoControllers()