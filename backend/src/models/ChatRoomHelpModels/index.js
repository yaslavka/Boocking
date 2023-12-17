const sequelize = require("../../../db");
const {UserModels} = require("../UserModels");
const { DataTypes } = require("sequelize");

const ChatRoomHelpModels = sequelize.define('chatRoomHelp', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    room:{type: DataTypes.STRING, defaultValue: null},
    userId:{type: DataTypes.BIGINT, defaultValue: null},
    recipient:{type: DataTypes.BIGINT, defaultValue: null},
})
UserModels.hasMany(ChatRoomHelpModels, {as: 'chatRoomHelp'})
ChatRoomHelpModels.belongsTo(UserModels,{as : 'user'})
ChatRoomHelpModels.belongsTo(UserModels,{foreignKey: 'recipient', as : 'users'})
module.exports = {ChatRoomHelpModels}