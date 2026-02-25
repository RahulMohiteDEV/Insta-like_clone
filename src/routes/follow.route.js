const express = require("express");
const followController = require('../controllers/follow.controller')
const identifyUser = require('../middlewares/auth.middleware')

const followRouter = express.Router();

followRouter.post("/follow/:username",  identifyUser, followController.followDetailsController)


followRouter.post("/unfollow/:username",  identifyUser, followController.unfollowDetailsController)

module.exports = followRouter;