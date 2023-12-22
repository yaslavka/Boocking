const jwt = require("jsonwebtoken");
const { PayHistoryModals } = require('../../models/PayHistoryModals')
const { UserModels } = require('../../models/UserModels')

class PayControllers {
  async payHistory(req, res){
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(409).json({ message: 'вы не авторизованы' });
    }else {
      const token = authorization.slice(7);
      try {
        const { username } = jwt.decode(token);
        let user = await UserModels.findOne({ where: { username:username } });
        if (!user) {
          return res.status(409).json({ message: 'вы не авторизованы' });
        }else {
          const payHistory = await PayHistoryModals.findAll({ where:{ userId:user.id } })
          if (!payHistory.length){
            return res.status(200).json([]);
          }else {
            return res.status(200).json(payHistory);
          }
        }
      }catch (error){
        return res.status(500).json(error);
      }
    }
  }
}
module.exports = new PayControllers()