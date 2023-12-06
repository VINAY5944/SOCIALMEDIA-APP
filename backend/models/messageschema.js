const mongoose=require('mongoose')



const  messageSchema=mongoose.Schema({

chatId:{type:String},
senderId :{type:String},
text:{
    type:String
},


},{
timestamps:true
}
)
const messageModel=mongoose.model('socialmediamessagemodel',messageSchema)
module.exports=messageModel;