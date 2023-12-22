const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ReviewModels } = require("../../models/ReviewModels");
const { PromotionHotelModels } = require("../../models/PromotionHotelModels");
const { PromotionModels } = require("../../models/PromotionModels");
const { AlbumNumbers } = require("../../models/AllbumNumbers");
const { NumbersModels } = require("../../models/NumbersModels");
const { AlbumHotel } = require("../../models/AllbumHotel");
const { GeoCityModels } = require("../../models/GeoCityModels");
const { HotelModals } = require("../../models/HotelModals");
const { UserModels } = require("../../models/UserModels");

const decode='random_key'
const generateJwt = (id, email, username, first_name, last_name, referral) => {
  return jwt.sign({ id:id, email: email, first_name: first_name, last_name: last_name, referral: referral, username: username },decode);
};

class UserControllers{
  async inviter(req, res) {
    const { username } = req.body;
    const user = await UserModels.findOne({ where: { username:username } });
    if (!user) {
      return res.status(409).json({ message:"Такой пользователь не найден" });
    }
    let result = {
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };
    return res.status(200).json(result);
  }
  async register(req, res){
    const { email, first_name, last_name, password, phone, referral, username } = req.body;
    console.log(req.body)
    const candidateEmail = await UserModels.findOne({ where: { email:email } })
    const candidateUsername = await UserModels.findOne({ where: { username:username } })
    const candidatePhone = await UserModels.findOne({ where: { phone:username } })
    if (!referral){
      if (candidateEmail) {
        return res.status(409).json({ message:"Пользователь с таким email уже существует" });
      }else if (candidateUsername){
        return res.status(409).json({ message:"Пользователь с таким username уже существует" });
      }else if (candidatePhone){
        return res.status(409).json({ message:"Пользователь с таким телефоном уже существует" });
      }else {
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await UserModels.create({
          email:email,
          username:username,
          first_name:username,
          last_name:last_name,
          password: hashPassword,
          phone:phone,
          inviter_id: 1,
        });
        const access_token = generateJwt(
          user.id,
          user.email,
          user.username,
          user.first_name,
          user.last_name,
          user.referral
        );
        return res.status(200).json(access_token);
      }
    }else {
      if (candidateEmail) {
        return res.status(409).json({ message:"Пользователь с таким email уже существует" });
      }else if (candidateUsername){
        return res.status(409).json({ message:"Пользователь с таким username уже существует" });
      }else if (candidatePhone){
        return res.status(409).json({ message:"Пользователь с таким телефоном уже существует" });
      }else {
        const hashPassword = await bcrypt.hash(password, 5);
        const referralUser = await UserModels.findOne({ where: { username: referral } });
        const user = await UserModels.create({
          email,
          username,
          first_name,
          last_name,
          password: hashPassword,
          phone,
          inviter_id: referralUser.id,
        });
        const access_token = generateJwt(
          user.id,
          user.email,
          user.username,
          user.first_name,
          user.last_name,
          user.referral
        );
        return res.status(200).json(access_token);
      }
    }
  }
  async login(req, res){
    const { username, password } = req.body;
    const user = await UserModels.findOne({ where: { username:username } });
    if (!user) {
      return res.status(409).json({ message:"Неверный Логин" });
    }else {
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(409).json({ message:"Неверный пароль" });
      }else {
        const access_token = generateJwt(
          user.id,
          user.email,
          user.username,
          user.first_name,
          user.last_name,
          user.referral
        );
        return res.status(200).json(access_token);
      }
    }
  }
  async user(req, res){
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(409).json({ message:"Ошибка авторизации" });
    }else {
      const token = authorization.slice(7);
      try {
        const { username } = jwt.decode(token);
        let user = await UserModels.findOne({ where: { username:username }, include:[ 'inviter', { model: GeoCityModels, as: 'geo_city' } ] });
        let hotel = await HotelModals.findAll({ where:{ userId:user.id }, include:[ { model:ReviewModels, as:'review' },{ model: PromotionHotelModels, as: 'promotionHotel' },{ model: GeoCityModels, as: 'geo_city' }, { model: AlbumHotel, as:'albumHotel' }, { model: NumbersModels, as: 'number', include:[ { model: AlbumNumbers, as: 'albumNumber' } ] } ] })
        const promotion = await PromotionModels.findAll()
        if (!user) {
          return res.status(409).json({ message:"Ошибка авторизации" });
        }else {
          user.dataValues.promotion = promotion
          user.dataValues.hotel =hotel
          return res.status(200).json(user);
        }
      }catch (error){
        return res.status(500).json({ message:error });
      }
    }
  }
  async allUsers(req, res) {
    const user = await UserModels.findAll();
    if (!user) {
      return res.status(409).json({ message:"Пустой результат" });
    }
    return res.status(200).json(user);
  }
}
module.exports = new UserControllers()