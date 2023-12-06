const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
  
    userId:{type:String,required:true},
    desc:{type:String},
    likes:[],
    image:{type:String}
},
{timeStamps:true}
)
const postModel=mongoose.model('posts',postSchema);
module.exports=postModel;