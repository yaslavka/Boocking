const {AlbumHotel} = require("../../models/AllbumHotel");
const {GeoCityModels} = require("../../models/GeoCityModels");
const {UserModels} = require("../../models/UserModels");
const {ReviewModels} = require("../../models/ReviewModels");
const {HotelModals} = require("../../models/HotelModals");
const {AlbumNumbers} = require("../../models/AllbumNumbers");
const {NumbersModels} = require("../../models/NumbersModels");

class NumberControllers {
    async numberId(req, res){
        const {id}=req.query
        const numberId = await NumbersModels.findOne({where:{id:id}, include:[{model: AlbumNumbers, as: 'albumNumber'}, {model:HotelModals,as:'hotel', include:[{model: AlbumHotel, as:'albumHotel'},{model: ReviewModels, as:'review', include:[{model: UserModels, as: 'user', include:[{model: GeoCityModels, as:'geo_city'}]}]}]}]})
        if (!numberId){
            return res.status(409).json({message: 'Нет такого номера'});
        }else {
            return res.status(200).json(numberId);
        }
    }
}
module.exports = new NumberControllers()