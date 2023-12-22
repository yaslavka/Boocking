const { GeoCityModels } = require('../../models/GeoCityModels')
const { Op } = require('sequelize')


class GeoControllers{
  async geoCities(req, res){
    const cities = await GeoCityModels.findAll({ where:{ [Op.or]:[ { geo_city:'Майкоп' }, { geo_city:'Горно-Алтайск' }, { geo_city:'Барнаул' },{ geo_city:'Бийск' },{ geo_city:'Рубцовск' },{ geo_city:'Москва' } ] } })
    if (!cities.length){
      return res.status(409).json({ message: '' })
    }else {
      return res.status(200).json(cities)
    }
  }
  async allCities(req, res){
    const cities = await GeoCityModels.findAll({ where:{ [Op.or]:[ { geo_city:'Майкоп' },{ geo_city:'Горно-Алтайск' },{ geo_city:'Барнаул' },{ geo_city:'Бийск' },{ geo_city:'Рубцовск' },{ geo_city:'Москва' }, ] } })
    if (!cities.length){
      return res.status(409).json({ message: '' })
    }else {
      return res.status(200).json(cities)
    }
  }
}
module.exports = new GeoControllers()