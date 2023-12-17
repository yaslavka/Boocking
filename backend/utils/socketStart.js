const {HelpMessagesModels} = require("../src/models/HelpMessagesModels");
const {ChatRoomHelpModels} = require("../src/models/ChatRoomHelpModels");
const {UserMessagesModels} = require("../src/models/UserMessagesModels");
const {UserModels} = require("../src/models/UserModels");
const {ChatRoomModels} = require("../src/models/ChatRoomModels");
const {Op} = require("sequelize");

module.exports = async (socket, io) =>{
    socket.on('allMessage', async data => {
        console.log(data)
        const allMessage = await ChatRoomModels.findAll({where: { [Op.or]:[{userId: data}, {recipient: data}] }, include:[{model: UserModels, as:'user'}, 'users', {model: UserMessagesModels, as:'message', include:[{model: UserModels, as:'user'}, 'users']}]})
        socket.emit('allMessageRec', allMessage)
    })
    socket.on('allMessageHelp', async data => {
        console.log(data)
        const allMessageHelp = await ChatRoomHelpModels.findAll({where: { [Op.or]:[{userId: data}, {recipient: data}] }, include:[{model: UserModels, as:'user'}, 'users', {model: HelpMessagesModels, as:'helpMessage', include:[{model: UserModels, as:'user'}, 'users']}]})
        socket.emit('allMessageHelpRec', allMessageHelp)
    })
}