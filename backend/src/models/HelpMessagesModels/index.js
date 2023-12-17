const sequelize = require("../../../db");
const {ChatRoomHelpModels} = require("../ChatRoomHelpModels");
const {UserModels} = require("../UserModels");
const { DataTypes } = require("sequelize");

const HelpMessagesModels = sequelize.define('helpMessage', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    helpMessage: { type: DataTypes.STRING, allowNull: false },
    recipient:{type: DataTypes.BIGINT, defaultValue: null},
    status:{type: DataTypes.BOOLEAN, defaultValue: false},
    userId:{type: DataTypes.BIGINT, defaultValue: null},
    chatRoomHelpId:{type: DataTypes.BIGINT, defaultValue: null},
},{
    timestamps: true
})

UserModels.hasMany(HelpMessagesModels, {as: 'helpMessage'})
HelpMessagesModels.belongsTo(UserModels,{as : 'user'})
HelpMessagesModels.belongsTo(UserModels,{foreignKey: 'recipient', as : 'users'})

ChatRoomHelpModels.hasMany(HelpMessagesModels, {as: "helpMessage"});
HelpMessagesModels.belongsTo(ChatRoomHelpModels, {as: 'chatRoomHelp'});
module.exports = {HelpMessagesModels}