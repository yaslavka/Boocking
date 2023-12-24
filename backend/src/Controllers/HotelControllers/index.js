const jwt = require("jsonwebtoken");
const { PromotionHotelModels } = require('../../models/PromotionHotelModels')
const { Op } = require("sequelize");
const cloudinary = require('cloudinary').v2;
const { UserModels } = require("../../models/UserModels");
const { ReviewModels } = require("../../models/ReviewModels");
const { AlbumNumbers } = require("../../models/AllbumNumbers");
const { AlbumHotel } = require("../../models/AllbumHotel");
const { GeoRegionsModels } = require("../../models/GeoRegionsModels");
const { NumbersModels } = require("../../models/NumbersModels");
const { GeoCityModels } = require("../../models/GeoCityModels");
const { HotelModals } = require("../../models/HotelModals");

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

class HotelControllers{
  async hotelId(req,res){
    const { id }=req.query
    let hotelId = await HotelModals.findOne({ where:{ id:id }, include:[ { model: ReviewModels, as: 'review', include:[ { model: UserModels, as: 'user', include:[ { model: GeoCityModels, as:'geo_city' } ] } ] },{ model: GeoCityModels, as: 'geo_city' },{ model: AlbumHotel, as:'albumHotel' }, { model: NumbersModels, as: 'number', include:[ { model: AlbumNumbers, as: 'albumNumber' } ] } ] })
    if (!hotelId){
      return res.status(409).json({ message: '' })
    }else {
      return res.status(200).json(hotelId)
    }
  }
  async citiId(req, res){
    const { id }=req.query
    let cities = await GeoCityModels.findOne({ where:{ id:id }, include:[ { model:GeoRegionsModels, as: 'geo_region' } ] })
    const hotel = await HotelModals.findAll({ where:{ geoCityId:cities.id }, include:[ { model: AlbumHotel, as:'albumHotel' }, { model: NumbersModels, as: 'number', include:[ { model: AlbumNumbers, as: 'albumNumber' } ] } ] })
    if (!cities){
      return res.status(409).json({ message: '' })
    }else {
      cities.dataValues.hotel = hotel
      return res.status(200).json(cities)
    }
  }
  async uploadImagesHotel(req, res){
    console.log(req.file)
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
          const hotel = await HotelModals.findOne({ where:{ [Op.and]:[ { id:id }, { userId:user.id } ] } })
          if (!hotel){
            return res.status(409).json({ message: "Ошибка загрузки Изображения" })
          }else {
            await cloudinary.uploader.upload(req.file.path, options, async (error, result) => {
              if (result && result.secure_url) {
                let update = { imageHotel: result.secure_url }
                await HotelModals.update(update, { where: { id: hotel.id } })
                return res.status(200).json({ message: 'Изображение успешно обновленно' })
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
  async myObject(req, res){
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
        const hotel = await HotelModals.findAll({ where:{ userId:user.id }, include:[ { model: ReviewModels, as:'review' }, { model: PromotionHotelModels, as: 'promotionHotel' }, { model: AlbumHotel, as:'albumHotel' }, { model: NumbersModels, as: 'number', include:[ { model: AlbumNumbers, as: 'albumNumber' } ] } ] })
        if (!hotel.length){
          return res.status(200).json([])
        }else {
          return res.status(200).json(hotel)
        }
      }
    }
  }
  async myObjectAdd(req, res){
    console.log(req.body)
    const {
      nameHotel,
      requisitesPay,
      phonePay,
      wifi,
      breakfast,
      swimmingPool,
      discount,
      latitude,
      longitude,
      address,
      phone,
      email,
      price,
      NumberOfRooms,
      distanceTo,
      distanceOut,
      distanceCenter,
      distanceRailwayStation,
      typeHotel,
      typeOfRooms,
      descriptionHotel,
      active,
      pay,
    } = req.body
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
        const id = await HotelModals.create({
          nameHotel:nameHotel,
          requisitesPay:requisitesPay,
          phonePay:phonePay,
          wifi:wifi,
          breakfast:breakfast,
          swimmingPool:swimmingPool,
          discount:discount,
          latitude:latitude,
          longitude:longitude,
          address:address,
          phone:phone,
          email:email,
          price:price,
          NumberOfRooms:NumberOfRooms,
          distanceTo:distanceTo,
          distanceOut:distanceOut,
          distanceCenter:distanceCenter,
          distanceRailwayStation:distanceRailwayStation,
          typeHotel:typeHotel,
          typeOfRooms:typeOfRooms,
          descriptionHotel:descriptionHotel,
          active:active,
          pay:pay,
          geoCityId: user.geoCityId,
          userId: user.id,
        })
        return res.status(200).json({ message: "Новый отель успешно добавлен теперь добавте номера и фото",  id:id?.id })
      }
    }
  }
  async uploadAlbumImagesHotel(req, res){
    console.log(req.files)
    const { id }=JSON.parse(req.body.dataHotel)
    const files = req.files;
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(409).json({ message: 'Вы не авторизованы' });
    }else {
      try {
        const token = authorization.slice(7);
        const { username } = jwt.decode(token);
        let user = await UserModels.findOne({ where:{ username: username, isManager: true } });
        if (!user) {
          return res.status(409).json({ message: "Вы не являетесь ательером" })
        }else {
          const hotel = await HotelModals.findOne({ where:{ [Op.and]:[ { id:id }, { userId:user.id } ] } })
          if (!hotel){
            return res.status(409).json({ message: "Ошибка загрузки Изображения" })
          }else {
            for (const file of files){
              await cloudinary.uploader.upload(file.path, options, async (error, result) => {
                if (result && result.secure_url) {
                  await AlbumHotel.create({
                    albumHotel:result.secure_url,
                    hotelId:hotel.id,
                  })
                }
              });
            }
            return  res.status(200).json({ message: 'изображения успешно добавленны' })
          }
        }
      }catch (error){
        console.log(error)
      }
    }
  }
  async hotelEdit(req, res){
    const {
      nameHotel,
      requisitesPay,
      phonePay,
      wifi,
      breakfast,
      swimmingPool,
      discount,
      latitude,
      longitude,
      address,
      phone,
      email,
      bal,
      price,
      NumberOfRooms,
      rating,
      distanceTo,
      distanceOut,
      distanceCenter,
      distanceRailwayStation,
      typeHotel,
      typeOfRooms,
      descriptionHotel,
      active,
      pay,
      geoCityId,
      id,
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
        const hotel = await HotelModals.findOne({where:{id:id, userId:user.id}})
        if (!hotel){
          return res.status(409).json({ message: "Вы не являетесь менеджером" })
        }else {
          let update = {
            nameHotel,
            requisitesPay,
            phonePay,
            wifi,
            breakfast,
            swimmingPool,
            discount,
            latitude,
            longitude,
            address,
            phone,
            email,
            bal,
            price,
            NumberOfRooms,
            rating,
            distanceTo,
            distanceOut,
            distanceCenter,
            distanceRailwayStation,
            typeHotel,
            typeOfRooms,
            descriptionHotel,
            active,
            pay,
            geoCityId,
          }
          await HotelModals.update(update, {where:{id:hotel.id, userId:user.id}})
          return res.status(200).json({ message: 'Отель успешно обновлен' })
        }
      }
    }
  }
}
module.exports = new HotelControllers()