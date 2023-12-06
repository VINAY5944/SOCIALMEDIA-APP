const express=require('express');
const messageModel=require('../models/messageschema')

////adding a new message
const addMessage=async(req,res)=>{
const {chatId,senderId,text}=req.body;
const message= new messageModel({
    chatId,
    senderId,
    text
})
try {
    const newmessage=await message.save()
    res.json(newmessage)
} catch (error) {
    console.log(`the error in the addmessage controller is ${error}`);
}
}


//getting an existing message
const getMessages=async(req,res)=>{
const {chatId}=req.params;
try {
    const result= await messageModel.find({chatId})
    res.json(result)
} catch (error) {
    console.log(`the error in the addmessage controller is ${error}`);
}

}



module.exports={addMessage,getMessages}