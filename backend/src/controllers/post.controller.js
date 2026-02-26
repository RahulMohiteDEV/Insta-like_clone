const postModel = require('../models/post.model');
const ImageKit = require ('@imagekit/nodejs');
const { Folders } = require('@imagekit/nodejs/resources.js');
const jwt = require('jsonwebtoken');
const likeModel = require('../models/likes.model');


const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
    
})

async function createPostController (req, res) {
  
 

      const file = await imagekit.files.upload({
            file: req.file.buffer.toString("base64"),  
            fileName: "Test.jpg",
            folder:"Instagaram_clone"

        });

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:req.user.id
    })

    res.status(201).json({
        message:"post created succefully",
        post
    })
}

async function  getPostController(req, res) {

    

    const userId = req.user.id

    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"posts fetched ",
        posts
    })


}

async function getPostDetails (req, res) {
   
 
    const userId = req.user.id
    const postId = req.params.userId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"invalid user"
        })
    }

    return res.status(200).json({
        message:"Post found Succesfully",
        post
    })


}

async function postLikeController(req, res){
 const username = req.user.username
 const postId =  req.params.postId
 
 const post = await postModel.findById(postId);

 if(!post){
    return res.status(404).json({
        message:"post not found"
    })
 }

 const like = await likeModel.create({
    post:postId,
    user:username
 })

res.status(200).json({
    message:"POST liked",
    like
})

}

module.exports = {
    createPostController,
    getPostController,
    getPostDetails,
    postLikeController
}