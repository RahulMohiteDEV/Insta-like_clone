const express = require('express');
const postRouter = express.Router();
const PostController = require('../controllers/post.controller')
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});
const identifyUser = require("../middlewares/auth.middleware")


postRouter.post('/', upload.single("image") , identifyUser, PostController.createPostController);

postRouter.get('/', identifyUser, PostController.getPostController);

postRouter.get('/Details/:userId',identifyUser, PostController.getPostDetails)

postRouter.post('/like/:postId', identifyUser, PostController.postLikeController)

module.exports = postRouter;