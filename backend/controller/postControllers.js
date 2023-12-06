const { default: mongoose } = require("mongoose");
const postModel = require("../models/postschema");
const userModel = require("../models/userschema");


///create post

const createPost = async (req, res) => {
  const userId = req.params.id;
  const desc=req.body.desc;
  const image = req.body.image;
  try {
   
      const createpost = await postModel.create({userId,desc,image});
      res.json(createpost);
   
  } catch (error) {
    console.log(`the error in create post controller is ${error}`);
  }
};
//get a post

const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const fetchpost = await postModel.findById(postId);
    res.json(fetchpost);
  } catch (error) {
    console.log(`the error in get post controller is ${error}`);
  }
};

//update a post

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const fetchpost = await postModel.findById(postId);
    if (fetchpost.userId == userId) {
      const updtpost = await postModel.updateOne({ $set: req.body });
      res.json("post updated ");
    } else {
      res.json("post not  updated ");
    }
  } catch (error) {
    console.log(`the error in update post controller is ${error}`);
  }
};
////delete post

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const fetchpost = await postModel.findById(postId);
    if (fetchpost.userId == userId) {
      const updtpost = await postModel.findByIdAndDelete(postId);
      res.json("post deleted");
    } else {
      res.json("post not deleted");
    }
  } catch (error) {
    console.log(`the error in delete post controller is ${error}`);
  }
};

//like and unlike the post

const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const fetchpost = await postModel.findById(postId);

    if (!fetchpost.likes.includes(userId)) {
      await fetchpost.updateOne({ $push: { likes: userId } });
      res.json("post liked");
    } else {
      await fetchpost.updateOne({ $pull: { likes: userId } });
      res.json("post unliked");
    }
  } catch (error) {
    console.log(`the error in like post controller is ${error}`);
  }
};

///get timeline of posts
const timelinePosts = async (req, res) => {
  const  userId = req.params.id;

  try {
    const currentUserPosts = await postModel.find({ userId: userId });
    const followingPost = await userModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "posts",
          localField:"following",
          foreignField:"userId",
          as: "followingPost",
        },
      },
      {
        $project: {
          followingPost: 1,
          _id:0
         
        },
      },
    ]);

    const allPosts= await (currentUserPosts.concat(...followingPost[0].followingPost).sort((a,b)=>{
        return b.createdAt-a.createdAt
    })
    )

    res.json(allPosts);
  } catch (error) {
    console.log(`the error in display following post controller is ${error}`);
  }
};





//get all posts of the user 

const singleUserPosts=async(req,res)=>{

const {userId}=req.body;
try {

  const currentUserPosts = await postModel.find({ userId: userId });

  if (currentUserPosts) {
    res.json(currentUserPosts);
  } else {
    res.status(404).json({ message: 'User posts not found' });
  }
} catch (error) {
  console.log(`The error in the display all posts of the post controller is ${error}`);
  res.status(500).json({ message: 'Internal server error' });
}



}





module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  timelinePosts,
  singleUserPosts,
};
