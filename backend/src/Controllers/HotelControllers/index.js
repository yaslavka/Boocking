const {NumbersModels} = require("../../models/NumbersModels");
const {GeoCityModels} = require("../../models/GeoCityModels");
const {HotelModals} = require("../../models/HotelModals");

class HotelControllers{
    async hotelId(req,res){
        const {id}=req.body
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
        const {id}=req.body
        let cities = await GeoCityModels.findOne({where:{id:id}})
        if (!cities.length){
            return res.status(409).json({ message: '' })
        }else {
            let hotel = await HotelModals.findAll({where:{geoCityId:cities.id}})
            if (!hotel.length){
                return res.status(409).json({ message: 'В данном городе отели отсутсвуют' })
            }else {
                cities.dataValues.hotel = hotel
                const numbers = await NumbersModels.findAll({where:{hotelId:hotel.map(i=>i.id)}})
                if (!numbers.length){
                    return res.status(409).json({ message: 'в некоторых отеях отсутствуют номера' })
                }else {
                    cities.dataValues.numbers = numbers
                    return res.status(200).json(cities)
                }
            }
        }
    }
}
module.exports = new HotelControllers()