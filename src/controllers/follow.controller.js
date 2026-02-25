const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followDetailsController(req, res){

 
    const followerUsername  = req.user.username
    const followeeUsername = req.params.username

   if (followeeUsername == followerUsername ){
    return res.status(400).json({
        message:"Your not following yourself"
    })
   }

   const isFolloweeExists = await userModel.findOne({
    username:followeeUsername
   })

   if(!isFolloweeExists){
    return res.status(404).json({
        message:"user not exists"
    })
   }

   const isalreadyFollowing = await followModel.findOne({
    follower:followerUsername,
        following:followeeUsername
   })

   if(isalreadyFollowing){
    return res.status(409).json({
        message:"already follows",
        follow: isalreadyFollowing
    })
   }
    const folloeRecords = await followModel.create({
        follower:followerUsername,
        following:followeeUsername
    })

  res.status(201).json({
    message:`you are following ${followeeUsername}`,
    follow:folloeRecords
  })

}

async function unfollowDetailsController(req, res){

     const followerUsername  = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
         follower:followerUsername,
        following:followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message:`you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`you are unfollow ${followeeUsername}`
    })

}


module.exports = {
    followDetailsController,
    unfollowDetailsController
}