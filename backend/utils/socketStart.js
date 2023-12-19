const {HelpMessagesModels} = require("../src/models/HelpMessagesModels");
const {ChatRoomHelpModels} = require("../src/models/ChatRoomHelpModels");
const {UserMessagesModels} = require("../src/models/UserMessagesModels");
const {UserModels} = require("../src/models/UserModels");
const {ChatRoomModels} = require("../src/models/ChatRoomModels");
const {Op} = require("sequelize");

module.exports = async (socket, io) =>{
    socket.on('allMessage', async data => {
        const allMessage = await ChatRoomModels.findAll({where: { [Op.or]:[{userId: data}, {recipient: data}] }, include:[{model: UserModels, as:'user'}, 'users', {model: UserMessagesModels, as:'message', include:[{model: UserModels, as:'user'}, 'users']}]})
        socket.emit('allMessageRec', allMessage)
    })
    socket.on('allMessageHelp', async data => {
        console.log(data)
        const allMessageHelp = await ChatRoomHelpModels.findAll({where: { [Op.or]:[{userId: data}, {recipient: data}] }, include:[{model: UserModels, as:'user'}, 'users', {model: HelpMessagesModels, as:'helpMessage', include:[{model: UserModels, as:'user'}, 'users']}]})
        socket.emit('allMessageHelpRec', allMessageHelp)
    })
    socket.on('sendMessage', async data=>{
       if (!data.token){

       }else {
           if (data.id === undefined || !data.id){
               let val = 1000000000000000;
               const chatId = await ChatRoomModels.create({
                   room: `room-1${Math.random()*val +1}`,
                   recipient:data.recipient,
                   userId:data.userId
               })
               await UserMessagesModels.create({
                   message:data.message,
                   recipient:data.recipient,
                   userId:data.userId,
                   chatRoomId:chatId?.id
               })
               socket.join(chatId.room);
               const allMessage = await ChatRoomModels.findAll({where: {id: chatId?.id}, include:[{model: UserModels, as:'user'}, 'users', {model: UserMessagesModels, as:'message', include:[{model: UserModels, as:'user'}, 'users']}]})
               io.to(chatId.room).emit('allMessageRec', allMessage)
           }else {
               const chat = await ChatRoomModels.findOne({where:{id:data.id}})
               await UserMessagesModels.create({
                   message:data.message,
                   recipient:data.recipient,
                   userId:data.userId,
                   chatRoomId:chat?.id
               })
               socket.join(chat.room);
               const allMessage = await ChatRoomModels.findAll({where: {id: chat?.id}, include:[{model: UserModels, as:'user'}, 'users', {model: UserMessagesModels, as:'message', include:[{model: UserModels, as:'user'}, 'users']}]})
               io.to(chat.room).emit('allMessageRec', allMessage)

           }
       }
    })
}