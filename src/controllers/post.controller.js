const postModel = require('../models/post.model');
const ImageKit = require ('@imagekit/nodejs');
const { Folders } = require('@imagekit/nodejs/resources.js');
const jwt = require('jsonwebtoken')


const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
    
})

async function createPostController (req, res) {
  
    console.log(req.body, req.file);
 
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unotherised user"
        })
    }
   
      let decoded;

    try{
     decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
    return res.status(401).json({
        message:"user is not otherised"
    })
    }
   
     console.log(decoded);

      const file = await imagekit.files.upload({
            file: req.file.buffer.toString("base64"),  
            fileName: "Test.jpg",
            folder:"Instagaram_clone"

        });

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"post created succefully",
        post
    })
}

async function  getPostController(req, res) {

    const token = req.cookies.token;

        if(!token){
        return res.status(401).json({
            message:"unotherised user"
        })
    }
   

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err){
        res.status(401).json({
            message:"invalid token"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"posts fetched ",
        posts
    })


}

async function getPostDetails (req, res) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unotherised person"
        })
    }

    let decoded;

    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (err){
        res.status(401).json({
            message:"Invalid Token"
        })

    }
 
    const userId = decoded.id
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

module.exports = {
    createPostController,
    getPostController,
    getPostDetails
}