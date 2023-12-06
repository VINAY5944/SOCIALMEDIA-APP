const userModel=require("../models/userschema");
const bcrypt=require('bcrypt')
const JWT_SECRET="12345";
const jwt=require('jsonwebtoken');

///get all users
const getAllExcept =async(req,res)=>{
const userId=req.params.id
try {
 const  getalluser=await userModel.find({ _id: { $ne: userId } })
 res.json(getalluser)
} catch (error) {
    console.log(`the error in the getall user controller is ${error}`);
}



}


///get a user- fetchedDetails is details except password


const getUser=async(req,res)=>{

    const userId=req.params.id;

   try {
    const finduser=await userModel.findById(userId);

    if(finduser){await res.json(finduser);}

    else{res.json('no user found with the given credentials')}
    
   } catch (error) {
    console.log(`the error in get user controller is${error}`);
   }


}


//update a user


const updateUser=async(req,res)=>{

    const userId=req.params.id;

  
if(userId){

try {

 const updatedUser= await userModel.findByIdAndUpdate(userId,req.body,{new:true})
res.json(updatedUser)
} catch (error) {
    console.log(`the error in update user controller is ${error}`);
}
}  
  else{
res.json('updation error ')
}
}


///delete user


const deleteUser=async(req,res)=>{
    const userId=req.params.id;

    const {currentUserId,currentAdminStatus}=req.body;
  
    if(userId==currentUserId ||currentAdminStatus ){
try {
    const del=await userModel.findByIdAndDelete(userId)
    res.json('succefuly deleted user')
} catch (error) {
    console.log(`the error in delete user controller is ${error}`);
}
}
   else{
    res.json('user id wrong or you are not the admin')
   }

    }


///follow a user


const followUser=async(req,res)=>{
    const userId=req.params.id;

    const {currentUserId}=req.body;
if (currentUserId==userId) {
    res.json('action restricted you cannot follow yourself')
} else {
    try {
    const followUsr= await userModel.findById(userId)   
    const followingUsr= await userModel.findById(currentUserId)  ;

    if (currentUserId==userId) {
        res.json('action restricted you cannot follow yourself')
    } 
    if(followUsr.followers.includes(currentUserId)){
        await followUsr.updateOne({$pull:{followers: currentUserId}})
        await followingUsr.updateOne({$pull:{following: userId}})
        res.json('user unfollowed')
    }
    else{
        await followUsr.updateOne({$push:{followers: currentUserId}})
        await followingUsr.updateOne({$push:{following: userId}})
        res.json('user followed')
    }


    } catch (error) {
        console.log(`the error in follow user controller is ${error}`);  
    }
}
}


//unfollow user 
const unfollowUser=async(req,res)=>{
    const userId=req.params.id;

    const {currentUserId}=req.body;
if (currentUserId==userId) {
    res.json('action restricted you cannot follow yourself')
} else {
    try {
    const unfollowUsr= await userModel.findById(userId)   
    const unfollowingUsr= await userModel.findById(currentUserId)  ;


    if(unfollowUsr.followers.includes(currentUserId)){
        await unfollowUsr.updateOne({$pull:{followers: currentUserId}})
        await unfollowingUsr.updateOne({$pull:{following: userId}})
        res.json('user unfollowed')
    }
    else{
        res.json('you are already unfollowing him')
    }
   
    } catch (error) {
        console.log(`the error in follow user controller is ${error}`);  
    }
}
}

///searching the user using names
const searchByName = async (req, res) => {

     const userId=await  req.query.userId
    const keyword = await req.query.search
    ? {
        $or: [
          { firstname: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    
    try {
      // Extract the search keyword from the query parameters
     
  
      // Use the userModel to find users that match the search criteria
      const users = await userModel.find(keyword).find({_id :{$ne:userId} });
  
      // Send the found users as the response
      res.send(users);
    } catch (error) {
      // Handle errors by logging them to the console
      console.log(`${error}`);
    }
  };
  
  // Export the search function for use in other parts of your application




module.exports={getUser,updateUser,deleteUser,followUser,unfollowUser,getAllExcept,searchByName}