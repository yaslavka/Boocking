const sequelize = require("../../../db");
const { UserModels } = require("../UserModels");
const { DataTypes } = require("sequelize");

const ChatRoomModels = sequelize.define('chatRoom', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  room:{ type: DataTypes.STRING, defaultValue: null },
  userId:{ type: DataTypes.BIGINT, defaultValue: null },
  recipient:{ type: DataTypes.BIGINT, defaultValue: null },
})
UserModels.hasMany(ChatRoomModels, { as: 'chatRoom' })
ChatRoomModels.belongsTo(UserModels,{ as : 'user' })
ChatRoomModels.belongsTo(UserModels,{ foreignKey: 'recipient', as : 'users' })
module.exports = { ChatRoomModels }