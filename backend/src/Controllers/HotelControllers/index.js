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
    let hotelId = await HotelModals.findOne({ where:{ id:id }})
    const review = await ReviewModels.findAll({where:{hotelId:hotelId.id}, include:[ { model: UserModels, as: 'user', include:[ { model: GeoCityModels, as:'geo_city' } ] } ] })
    const geo_city = await GeoCityModels.findOne({where: {id: hotelId.geoCityId}})
    const albumHotel = await AlbumHotel.findAll({where: {hotelId: hotelId.id}})
    const number = await NumbersModels.findAll({where: {hotelId: hotelId.id}, include:[ { model: AlbumNumbers, as: 'albumNumber' } ] })
    if (!hotelId){
      return res.status(409).json({ message: '' })
    }else {
      hotelId.dataValues.review = review
      hotelId.dataValues.geo_city = geo_city
      hotelId.dataValues.albumHotel = albumHotel
      hotelId.dataValues.number = number
      return res.status(200).json(hotelId)
    }
  }
  async citiId(req, res){
    const { id }=req.query
    let cities = await GeoCityModels.findOne({ where:{ id:id }, include:[ { model:GeoRegionsModels, as: 'geo_region' } ] })
    const hotels = await HotelModals.findAll({ where:{ geoCityId:cities.id }})
    const result = await Promise.all(
        hotels.map(async (hotel)=>{
          const albumHotel = await AlbumHotel.findAll({where: {
              hotelId:hotel.id
            }})
          const number = await NumbersModels.findAll({where:{
              hotelId:hotel.id
            }})
          const numbers = await Promise.all(
              number.map(async (item)=>{
                const album = await AlbumNumbers.findAll({where:{
                    numberId:item.id
                  }})
                return {
                  id: item.id,
                  nameNumber:item.nameNumber,
                  descriptionNumber:item.descriptionNumber,
                  imageNumber:item.imageNumber,
                  startDate:item.startDate,
                  endDates:item.endDates,
                  typeNumber:item.typeNumber,
                  sleepingPlaces:item.sleepingPlaces,
                  rooms:item.rooms,
                  quadrature:item.quadrature,
                  guests:item.guests,
                  tv:item.tv,
                  breakfast:item.breakfast,
                  wifi:item.wifi,
                  swimmingPool:item.swimmingPool,
                  discount:item.discount,
                  boardingHouse:item.boardingHouse,
                  price:item.price,
                  active:item.active,
                  bal:item.bal,
                  HotelModals:item.HotelModals,
                  count:item.count,
                  nutrition:item.nutrition,
                  clean:item.clean,
                  son:item.son,
                  hotelId:item.hotelId,
                  albumNumber:album
                }
              })
          )
          return {
            id: hotel.id,
            apartmentsCount: hotel.apartmentsCount,
            luxCount: hotel.luxCount,
            standardCount: hotel.standardCount,
            nameHotel:hotel.nameHotel,
            requisitesPay:hotel.requisitesPay,
            phonePay:hotel.phonePay,
            imageHotel:hotel.imageHotel,
            startDate:hotel.startDate,
            endDates:hotel.endDates,
            wifi:hotel.wifi,
            breakfast:hotel.breakfast,
            swimmingPool:hotel.swimmingPool,
            discount:hotel.discount,
            latitude:hotel.latitude,
            longitude:hotel.longitude,
            address:hotel.address,
            phone:hotel.phone,
            email:hotel.email,
            bal: hotel.bal,
            price:hotel.price,
            NumberOfRooms:hotel.NumberOfRooms,
            rating:hotel.rating,
            distanceTo:hotel.distanceTo,
            distanceOut:hotel.distanceOut,
            distanceCenter:hotel.distanceCenter,
            distanceRailwayStation:hotel.distanceRailwayStation,
            typeHotel:hotel.typeHotel,
            typeOfRooms:hotel.typeOfRooms,
            descriptionHotel:hotel.descriptionHotel,
            active:hotel.active,
            pay:hotel.pay,
            geoCityId: hotel.geoCityId,
            userId: hotel.userId,
            albumHotel:albumHotel,
            number:numbers
          }
        })
    )
    if (!cities){
      return res.status(409).json({ message: '' })
    }else {
      cities.dataValues.hotel = result
      return res.status(200).json(cities)
    }
  }
  async uploadImagesHotel(req, res){
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
      standardCount,
      luxCount,
      apartmentsCount
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
          apartmentsCount: apartmentsCount,
          luxCount: luxCount,
          standardCount: standardCount,
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
      standardCount,
      luxCount,
      apartmentsCount,
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
            standardCount,
            luxCount,
            apartmentsCount,
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
