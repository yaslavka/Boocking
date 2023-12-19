const jwt = require("jsonwebtoken");
const {Op} = require("sequelize");
const {UserModels} = require("../../models/UserModels");
const {ReviewModels} = require("../../models/ReviewModels");
const {AlbumNumbers} = require("../../models/AllbumNumbers");
const {AlbumHotel} = require("../../models/AllbumHotel");
const {GeoRegionsModels} = require("../../models/GeoRegionsModels");
const {NumbersModels} = require("../../models/NumbersModels");
const {GeoCityModels} = require("../../models/GeoCityModels");
const {HotelModals} = require("../../models/HotelModals");

class HotelControllers{
    async hotelId(req,res){
        const {id}=req.query
        let hotelId = await HotelModals.findOne({where:{id:id}, include:[{model: ReviewModels, as: 'review', include:[{model: UserModels, as: 'user', include:[{model: GeoCityModels, as:'geo_city'}]}]},{model: GeoCityModels, as: 'geo_city'},{model: AlbumHotel, as:'albumHotel'}, {model: NumbersModels, as: 'number', include:[{model: AlbumNumbers, as: 'albumNumber'}]}]})
        if (!hotelId){
            return res.status(409).json({ message: '' })
        }else {
            return res.status(200).json(hotelId)
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
    async uploadImagesHotel(req, res){
        const { id }=JSON.parse(req.body.dataHotel)
        const { filename }=req.file
        const { authorization } = req.headers;
        if(!authorization){
            return res.status(409).json({ message: 'Ошибка загрузки Изображения' });
        }else {
            const token = authorization.slice(7);
            const { username } = jwt.decode(token);
            let user = await UserModels.findOne({ where:{ username: username, isManager: true } });
            if (!user) {
                return res.status(409).json({ message: "Ошибка загрузки Изображения" })
            }else {
                const hotel = await HotelModals.findOne({where:{[Op.and]:[{id:id}, {userId:user.id}]}})
                if (!hotel){
                    return res.status(409).json({ message: "Ошибка загрузки Изображения" })
                }else {
                    let update = {imageHotel: filename}
                    await HotelModals.update(update, {where:{id:hotel.id}})
                    return res.status(200).json({message: 'Изображение успешно обновленно'})
                }
            }
        }
    }
}
module.exports = new HotelControllers()