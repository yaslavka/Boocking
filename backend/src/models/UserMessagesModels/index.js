const sequelize = require("../../../db");
const {ChatRoomModels} = require("../ChatRoomModels");
const {UserModels} = require("../UserModels");
const { DataTypes } = require("sequelize");

const UserMessagesModels = sequelize.define('message', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    message: { type: DataTypes.STRING, allowNull: false },
    recipient:{type: DataTypes.BIGINT, defaultValue: null},
    status:{type: DataTypes.BOOLEAN, defaultValue: false},
    userId:{type: DataTypes.BIGINT, defaultValue: null},
    chatRoomId:{type: DataTypes.BIGINT, defaultValue: null},
},{
    timestamps: true
})
UserModels.hasMany(UserMessagesModels, {as: 'message'})
UserMessagesModels.belongsTo(UserModels,{as : 'user'})
UserMessagesModels.belongsTo(UserModels,{foreignKey: 'recipient', as : 'users'})

ChatRoomModels.hasMany(UserMessagesModels, {as: "message"});
UserMessagesModels.belongsTo(ChatRoomModels, {as: 'chatRoom'});
module.exports = {UserMessagesModels}