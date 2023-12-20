//const { Op } = require("sequelize");
const { ReviewModels } = require("../../models/ReviewModels");
const { HotelModals } = require("../../models/HotelModals");

class RecommendedControllers{
  async recommended(req, res){
    const recommended = await HotelModals.findAll({ include:[ { model: ReviewModels, as: 'review' } ] })
    if (!recommended.length){
      return res.status(409).json({ message: 'Рекомендации отсутствуют' })
    }else {
      return res.status(200).json(recommended)
    }
  }
  async actions(req, res){
    const actions = await HotelModals.findAndCountAll({ include:[ { model: ReviewModels, as: 'review' } ] })
    if (!actions.rows.length){
      return res.status(409).json({ message: 'Рекомендации отсутствуют' })
    }else {
      return res.status(200).json(actions.rows)
    }
  }
}
module.exports = new RecommendedControllers()