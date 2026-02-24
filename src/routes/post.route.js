const express = require('express');
const postRouter = express.Router();
const PostController = require('../controllers/post.controller')
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});


postRouter.post('/', upload.single("image") , PostController.createPostController);

postRouter.get('/', PostController.getPostController);

postRouter.get('/Details/:userId', PostController.getPostDetails)

module.exports = postRouter;