const {AlbumNumbers} = require("../../models/AllbumNumbers");
const {AlbumHotel} = require("../../models/AllbumHotel");
const {GeoRegionsModels} = require("../../models/GeoRegionsModels");
const {NumbersModels} = require("../../models/NumbersModels");
const {GeoCityModels} = require("../../models/GeoCityModels");
const {HotelModals} = require("../../models/HotelModals");

class HotelControllers{
    async hotelId(req,res){
        const {id}=req.query
        let hotelId = await HotelModals.findOne({where:{id:id}})
        if (!hotelId){
            return res.status(409).json({ message: '' })
        }else {
            const cities = await GeoCityModels.findOne({where:{id:hotelId.geoCityId}})
            if (!cities.length){
                return res.status(409).json({ message: '' })
            }else {
                hotelId.dataValues.cities=cities
                const numbers = await NumbersModels.findAll({where:{hotelId:hotelId.id}})
                if (!numbers.length){
                    return res.status(409).json({ message: 'в некоторых отеях отсутствуют номера' })
                }else {
                    hotelId.dataValues.numbers = numbers
                    return res.status(200).json(hotelId)
                }
            }
        }
    }
    async citiId(req, res){
        const {id}=req.query
        let cities = await GeoCityModels.findOne({where:{id:id}, include:[{model:GeoRegionsModels, as: 'geo_region'}, {model: HotelModals, as:'hotel', include:[{model: NumbersModels, as: 'number', include:[{model: AlbumNumbers, as: 'albumNumber'}]}, {model: AlbumHotel, as:'albumHotel'}]}]})
        if (!cities){
            return res.status(409).json({ message: '' })
        }else {
            return res.status(200).json(cities)
        }
    }
}
module.exports = new HotelControllers()