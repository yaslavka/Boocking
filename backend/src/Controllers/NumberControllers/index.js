const jwt = require("jsonwebtoken");
const { Op } = require('sequelize')
const cloudinary = require('cloudinary').v2;
const { AlbumHotel } = require("../../models/AllbumHotel");
const { GeoCityModels } = require("../../models/GeoCityModels");
const { UserModels } = require("../../models/UserModels");
const { ReviewModels } = require("../../models/ReviewModels");
const { HotelModals } = require("../../models/HotelModals");
const { AlbumNumbers } = require("../../models/AllbumNumbers");
const { NumbersModels } = require("../../models/NumbersModels");

cloudinary.config({
  cloud_name: 'o-bron',
  api_key: '278663654189983',
  api_secret: 'ylrN1hLaaug6m_1KBPCS36wfGRw',
  secure: true,
});

const options = {
  overwrite: true,
  invalidate: true,
  resource_type: 'auto',
  folder: 'HotelImages'
}

class NumberControllers {
  async numberId(req, res){
    const { id }=req.query
    const numberId = await NumbersModels.findOne({ where:{ id:id }, include:[ { model: AlbumNumbers, as: 'albumNumber' }, { model:HotelModals,as:'hotel', include:[ { model: AlbumHotel, as:'albumHotel' },{ model: ReviewModels, as:'review', include:[ { model: UserModels, as: 'user', include:[ { model: GeoCityModels, as:'geo_city' } ] } ] } ] } ] })
    if (!numberId){
      return res.status(409).json({ message: 'Нет такого номера' });
    }else {
      return res.status(200).json(numberId);
    }
  }
  async numbersManager(req, res){
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(409).json({ message: 'Вы не авторизованы' });
    }else {
      const token = authorization.slice(7);
      const { username } = jwt.decode(token);
      let user = await UserModels.findOne({ where:{ username: username, isManager: true } });
      if (!user) {
        return res.status(409).json({ message: "Вы не являетесь менеджером" })
      }else {
        const hotels = await HotelModals.findAll({ where:{ userId:user.id } })
        if (!hotels.length){
          return res.status(200).json([])
        }else {
          const numbers = await NumbersModels.findAll({ where: { hotelId: hotels.map(i=>i.id) } })
          if (!numbers.length){
            return res.status(200).json([])
          }else {
            return res.status(200).json(numbers)
          }
        }
      }
    }
  }
  async numberEdit(req, res){
    const {
      startDate,
      endDates,
      nameNumber,
      descriptionNumber,
      typeNumber,
      sleepingPlaces,
      rooms,
      quadrature,
      guests,
      discount,
      price,
      count,
      active,
      wifi,
      breakfast,
      id,
      hotelId,
    }=req.body
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(409).json({ message: 'Вы не авторизованы' });
    }else {
      const token = authorization.slice(7);
      const { username } = jwt.decode(token);
      let user = await UserModels.findOne({ where:{ username: username, isManager: true } });
      if (!user) {
        return res.status(409).json({ message: "Вы не являетесь менеджером" })
      }else {
        const number = await NumbersModels.findOne({ where:{ id:id, hotelId:hotelId } })
        if (!number){
          return res.status(409).json({ message: "Вы не являетесь менеджером" })
        }else {
          let update = { startDate,
            endDates,
            nameNumber,
            descriptionNumber,
            typeNumber,
            sleepingPlaces,
            rooms,
            quadrature,
            guests,
            discount,
            price,
            count,
            active,
            wifi,
            breakfast }
          await NumbersModels.update(update, { where:{ id:number.id, hotelId:number.hotelId } })
          return res.status(200).json({ message: 'Номер успешно обновлен' })
        }
      }
    }
  }
  async numberAdd(req, res){
    const {
      startDate,
      endDates,
      nameNumber,
      descriptionNumber,
      typeNumber,
      sleepingPlaces,
      rooms,
      quadrature,
      guests,
      discount,
      price,
      count,
      active,
      wifi,
      breakfast,
      hotelId
    }=req.body
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(409).json({ message: 'Вы не авторизованы' });
    }else {
      const token = authorization.slice(7);
      const { username } = jwt.decode(token);
      let user = await UserModels.findOne({ where:{ username: username, isManager: true } });
      if (!user) {
        return res.status(409).json({ message: "Вы не являетесь менеджером" })
      }else {
        const id = await NumbersModels.create({
          startDate,
          endDates,
          nameNumber,
          descriptionNumber,
          typeNumber,
          sleepingPlaces,
          rooms,
          quadrature,
          guests,
          discount,
          price,
          count,
          active,
          wifi,
          breakfast,
          hotelId
        })
        return res.status(200).json(
          { message: "Новый Номер успешно добавлен теперь добавте фото",  id:id?.id }
        )
      }
    }
  }
  async uploadImageNumber(req, res){
    const { id }=JSON.parse(req.body.dataHotel)
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(409).json({ message: 'Ошибка загрузки Изображения' });
    }else {
      try {
        const token = authorization.slice(7);
        const { username } = jwt.decode(token);
        let user = await UserModels.findOne({ where:{ username: username, isManager: true } });
        if (!user) {
          return res.status(409).json({ message: "Ошибка загрузки Изображения" })
        }else {
          const number = await NumbersModels.findOne({ where:{ [Op.and]:[ { id:id }, { userId:user.id } ] } })
          if (!number){
            return res.status(409).json({ message: "Ошибка загрузки Изображения" })
          }else {
            await cloudinary.uploader.upload(req.file.path, options, async (error, result) => {
              if (result && result.secure_url) {
                let update = { imageNumber: result.secure_url }
                await NumbersModels.update(update, { where: { id: number.id } })
              }
            });
            return res.status(200).json({ message: 'Изображение успешно обновленно' })
          }
        }
      }catch (error){
        console.log(error)
      }
    }
  }
  async uploadAlbumNumber(req, res){
    const { id }=JSON.parse(req.body.dataHotel)
    const files = req.files;
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(409).json({ message: 'Вы не авторизованы' });
    }else {
      try {
        const token = authorization.slice(7);
        const { username } = jwt.decode(token);
        let user = await UserModels.findOne(
          { where:{ username: username, isManager: true } }
          );
        if (!user) {
          return res.status(409).json({ message: "Вы не являетесь ательером" })
        }else {
          const number = await NumbersModels.findOne(
            { where:{ [Op.and]:[ { id:id }, { userId:user.id } ] } }
            )
          if (!number){
            return res.status(409).json(
              { message: "Ошибка загрузки Изображения" })
          }else {
            for (const file of files){
              await cloudinary.uploader.upload(file.path, options,
                async (error, result) => {
                if (result && result.secure_url) {
                  await AlbumNumbers.create({
                    albumNumber:result.secure_url,
                    numberId:number.id,
                  })
                }
              });

            }
            return res.status(200).json(
              { message: 'изображения успешно добавленны' }
            )
          }
        }
      }catch (error){
        console.log(error)
      }
    }
  }
}
module.exports = new NumberControllers()