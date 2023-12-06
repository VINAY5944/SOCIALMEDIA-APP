const mongoose=require('mongoose')

const userSchema=mongoose.Schema({


username:{
    type:String,required:true
},
password:{
    type:String,required:true
},
firstname:{
    type:String,required:true
},
lastname:{
    type:String,required:true
},
isAdmin:{
    type:Boolean,default:false
},

profilePicture:{
    type:String}
,
coverPicture:{
    type:String}
,
about:{
    type:String}
,

livesIn:{
    type:String}
,
worksAt:{
    type:String}
,
bio:{
    type:String}
,
followers: { type: Array, default: [] },
following: { type: Array, default: [] },

},{timeStamps:true}
)

const userModel=mongoose.model('socialmediausers',userSchema);
module.exports=userModel;