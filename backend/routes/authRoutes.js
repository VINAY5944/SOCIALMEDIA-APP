const express=require('express');
const { register, login } = require('../controller/authController');
const { getUser, updateUser, deleteUser, followUser, unfollowUser, getAllExcept,searchByName } = require('../controller/userControllers');
const { createPost, getPost, updatePost, deletePost, likePost, timelinePosts, singleUserPosts } = require('../controller/postControllers');
const protect=require('../middleware/protect')
const router=express.Router();


const middleware=[protect]

const multer = require('multer');
const upload = require('../middleware/multermiddleware');
const uploadprof = require('../middleware/multermiddlewareprofilecover');
const { createChat, userChat, findChat } = require('../controller/chatControllers');
const { addMessage, getMessages } = require('../controller/messageControllers');













///ROUTES FOR AUTHENTICATION
///registration and login
router.route('/').post(register)
router.route('/login').post(login)






///ROUTES FOR USER OPERATIONS

///getall the users
router.route('/getallexcept/:id').get(middleware,getAllExcept)


///user searching
router.route('/searchuser/:id').get(middleware,getUser)


///user updating
router.route('/updateuser/:id').put(uploadprof.single('file'),middleware,updateUser)


//user delete
router.route('/deleteuser/:id').delete(middleware,deleteUser)


//follwing user
router.route('/followuser/:id').put(middleware,followUser)

//unfollowing user 
router.route('/unfollowuser/:id').put(middleware,unfollowUser)

//search a user by name
router.route('/searchuserbyname').get(middleware,searchByName)






///////POST ROUTES//////////


///creating a post 

router.route('/post/:id').post(upload.single('file'),middleware,createPost);


//getting a post 
router.route('/getpost/:id').get(middleware,getPost)



//update a post
router.route('/updatepost/:id').put(middleware,updatePost)


// delete a post 
router.route('/deletepost/:id').delete(middleware,deletePost)



//like a post
router.route('/likepost/:id').put(middleware,likePost)



//timeline posts
router.route('/timelinepost/:id').get(middleware,timelinePosts)



//getallposts by a single user 
router.route("/allpost").post(middleware,singleUserPosts)




////CHAT CONTROLLER ROUTES////

///create a new chat

router.route('/createchat').post(middleware,createChat)


////get all existing chat of a user

router.route('/getchat/:userId').get(middleware,userChat)



///find a specific chat

router.route('/findchat/:firstId/:secondId').get(middleware,findChat)



///MESSAGE CONTROLLER ROUTES///


/// adding a message 

router.route('/addmessage').post(middleware,addMessage)

//finding the message corresponding to a chat id
router.route('/getmessage/:chatId').get(middleware,getMessages)

module.exports=router;