const { GeoCityModels } = require("../../Models/GeoCityModels");

class GeoControllers{
  async geoCities(req, res){
    const cities = await GeoCityModels.findAndCountAll({ limit: 6 })
    if (!cities.rows.length){
      return res.status(409).json({ message: '' })
    }else {
      return res.status(200).json(cities.rows)
    }
  }
}
module.exports = new GeoControllers()