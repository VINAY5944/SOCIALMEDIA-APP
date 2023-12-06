const userModel=require("../models/userschema");
const bcrypt=require('bcrypt')
const JWT_SECRET="12345";
const jwt=require('jsonwebtoken')

///registerning a new user
const tokengenerate=(id)=>{
    return jwt.sign({id},JWT_SECRET,{
    
    expiresIn:'30d'
    
    })}

const register=async(req,res)=>{

    const {username,password,firstname,lastname}=req.body
   const salt=await bcrypt.genSalt(10)
   const hashedpassword= await bcrypt.hash(password,salt);
   const alreadyexist=await userModel.findOne({username})

if(alreadyexist){
res.json('already exist')

}
else{
    const createuser=await userModel.create({
        username,password:hashedpassword,firstname,lastname
    })

    res.json({

        Id:createuser._id,
        username:createuser.username,
        firstname:createuser.firstname,
        lastname:createuser.lastname,
        password:createuser.password,
        isAdmin:createuser.isAdmin,
        profilePicture:createuser.profilePicture,
        coverPicture:createuser.coverPicture,
        about:createuser.about,
        livesIn:createuser.livesIn,
        worksAt:createuser.worksAt,
        bio:createuser.bio,
        followers:createuser.followers,
        following:createuser.following,
        token:tokengenerate(createuser._id)
        });
}
} 




////login 
const login=async(req,res)=>{

    const {username,password}=req.body
   
   const loggedinuser=await userModel.findOne({username})


   if(loggedinuser&&(await bcrypt.compare(password,loggedinuser.password))){

    res.json({

        Id:loggedinuser._id,
        username:loggedinuser.username,
        firstname:loggedinuser.firstname,
        lastname:loggedinuser.lastname,
        password:loggedinuser.password,
        isAdmin:loggedinuser.isAdmin,
        profilePicture:loggedinuser.profilePicture,
        coverPicture:loggedinuser.coverPicture,
        about:loggedinuser.about,
        livesIn:loggedinuser.livesIn,
        worksAt:loggedinuser.worksAt,
        bio:loggedinuser.bio,
        followers:loggedinuser.followers,
        following:loggedinuser.following,
        token:tokengenerate(loggedinuser._id)
        });
   }

}






module.exports={register,login};
