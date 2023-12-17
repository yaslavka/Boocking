const jwt = require("jsonwebtoken");
const {GeoCityModels} = require("../../models/GeoCityModels");
const {ReviewModels} = require("../../models/ReviewModels");
const {HotelModals} = require("../../models/HotelModals");
const {AlbumNumbers} = require("../../models/AllbumNumbers");
const {Op} = require("sequelize");
const {NumbersModels} = require("../../models/NumbersModels");
const {ReservationModels} = require("../../models/ReservationModels");
const {UserModels} = require("../../models/UserModels");

class ReservationControllers {
    async reservation(req, res){
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
                    const reservation = await ReservationModels.findAll({where: {userId:user.id}, include:[{model:NumbersModels, as: 'number'}]})
                    if (!reservation.length){
                        return res.status(200).json([]);
                    }else {
                        return res.status(200).json(reservation);
                    }
                }
            }catch (error){
                return res.status(500).json(error);
            }
        }
    }
    async reservationInfo(req,res){
        const {number, pinCode}=req.body
        const reservationInfo = await ReservationModels.findOne({where:{[Op.and]:[{id:number}, {pinCode:pinCode}]}, include:[{model:NumbersModels, as: 'number'}]})
        if (!reservationInfo){
            return res.status(409).json({message: 'Нет такой Брони'});
        }else {
            return res.status(200).json(reservationInfo);
        }
    }
    async reservationId(req,res){
        const {id}=req.query
        const reservationId = await ReservationModels.findOne({where:{id:id}, include:[{model:NumbersModels, as: 'number',include:[{model: AlbumNumbers, as: 'albumNumber'}, {model:HotelModals,as:'hotel'}, {model: ReviewModels, as:'review', include:[{model: UserModels, as: 'user', include:[{model: GeoCityModels, as:'geo_city'}]}]}]}]})
        if (!reservationId){
            return res.status(409).json({message: 'Нет такой Брони'});
        }else {
            return res.status(200).json(reservationId);
        }
    }
    async reservationBook(req, res){
        const {id, count, sum, startDate, endDates }=req.body
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
                    const numberId = await NumbersModels.findOne({where:{id:id}})
                    if (!numberId){
                        return res.status(409).json({message: 'Невозможно выполнить'});
                    }else {
                        if (+user.balance < +sum){
                            return res.status(409).json({message: 'На балансе не достаточно средств'});
                        }else {
                            await UserModels.update({balance: +user.balance - +sum}, {where:{id:user.id}})
                            await ReservationModels.create({
                                count:count,
                                sum:sum,
                                startDate:startDate,
                                endDates:endDates,
                                pinCode:'12345678',
                                payStatus:true,
                                userId: user.id,
                                numberId: numberId.id,
                            })
                            return res.status(200).json({message:'Бронь успешно создана'});
                        }
                    }
                }
            }catch (error){
                return res.status(500).json(error);
            }
        }
    }
    async reservationManager(req, res){
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
                    const hotel = await HotelModals.findAll({where: {userid:user.id}})
                    const numbers = await NumbersModels.findAll({where:{hotelId: hotel.map(i=>i.id)}})
                    const reservation = await ReservationModels.findAll({where: {numberId:numbers.map(i=>i.id)}, include:[{model:NumbersModels, as: 'number'}]})
                    if (!reservation.length){
                        return res.status(200).json([]);
                    }else {
                        return res.status(200).json(reservation);
                    }
                }
            }catch (error){
                return res.status(500).json(error);
            }
        }
    }

}

module.exports = new ReservationControllers()