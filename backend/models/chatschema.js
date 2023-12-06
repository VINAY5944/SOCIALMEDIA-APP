const mongoose =require('mongoose');

const chatSchema=mongoose.Schema({

members:{type :Array}

},{
    timestamps:true
}

)

const chatModel=mongoose.model('socialmediachatmodel',chatSchema)
module.exports=chatModel;