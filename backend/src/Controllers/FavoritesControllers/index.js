const jwt = require("jsonwebtoken");
const {Op} = require("sequelize");
const {HotelModals} = require("../../models/HotelModals");
const {UserModels} = require("../../models/UserModels");
const {FavoritesModels} = require("../../models/FavoritesModels");

class FavoritesControllers {
    async allFavorites(req, res){
        const { authorization } = req.headers;
        if(!authorization){
            return res.status(409).json({message: 'вы не авторизованы'});
        }else {
            const token = authorization.slice(7);
            try {
                const { username } = jwt.decode(token);
                let user = await UserModels.findOne({ where: { username:username } });
                if (!user) {
                    return res.status(409).json({message: 'вы не авторизованы'});
                }else {
                    const favorites = await FavoritesModels.findAll({where:{userId:user.id}, include:[{model:HotelModals, as: 'hotel'}]})
                    if (!favorites.length){
                        return res.status(200).json([]);
                    }else {
                        return res.status(200).json(favorites);
                    }
                }
            }catch (error){
                return res.status(500).json(error);
            }
        }
    }
    async addToFavorites(req,res){
        const { authorization } = req.headers;
        const {id, status}=req.body
        if(!authorization){
            return res.status(409).json({message: 'вы не авторизованы'});
        }else {
            const token = authorization.slice(7);
            try {
                const { username } = jwt.decode(token);
                let user = await UserModels.findOne({ where: { username:username } });
                if (!user) {
                    return res.status(409).json({message: 'вы не авторизованы'});
                }else {
                    const favorites = await FavoritesModels.findOne({where:{[Op.and]:[{userId:user.id}, {hotelId:id}]}})
                    if (!favorites){
                        await FavoritesModels.create({
                            status:status,
                            hotelId:id,
                            userId:user.id
                        })
                        return res.status(200).json(true);
                    }else {
                        let update = {status:status}
                        await FavoritesModels.update(update, {where:{[Op.and]:[{userId:user.id}, {hotelId:id}]}})
                        return res.status(200).json(true);
                    }
                }
            }catch (error){
                return res.status(500).json(error);
            }
        }
    }
}
module.exports = new FavoritesControllers()