const express=require('express')

const chatModel=require('../models/chatschema')



///to create a new chat

const createChat=async(req,res)=>{
const newChat= new chatModel({
 members:[req.body.senderId,req.body.receiverId]
})

try {
    const result=await newChat.save();
    res.json(result)
} catch (error) {
    console.log(`the error in the create chat controller is${error}`);
    res.json(error)
}
}




///to find all  existing chat of an user with a given id

const userChat=async(req,res)=>{

try {

    const chat= await chatModel.find({
        members:{$in: [req.params.userId]}
    })
    res.json(chat)
} catch (error) {
    console.log(`the error in the userchat controller is${error}`);
   
}



}


// to find the specific chat  of 2 users

const findChat=async(req,res)=>{



try {
  const chat= await chatModel.findOne({
    members:{$all:[req.params.firstId,req.params.secondId] }
  })  
  
res.json(chat)

} catch (error) {
    console.log(`the error in the findchat controller is${error}`);
   
}




}



module.exports={createChat,userChat,findChat}