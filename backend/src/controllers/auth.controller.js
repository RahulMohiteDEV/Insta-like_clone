const userModel = require('../models/user.model');
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


async function registerController(req, res) {

    const { email, username, password, bio, profileImg } = req.body;
    const isUseralreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUseralreadyExists) {
        return res.status(409)
            .json({
                message: "user already exists" + (isUseralreadyExists.email == email ? "email already exists" : "user already exist")
            })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImg,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username:user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token);
    res.status(201).json({
        message: "user register succesfully",
        user: {
            email: user.email,
            username: user.username,
            profileImg: user.profileImg,
            bio: user.bio

        }
    })
}

async function loginController(req, res) {
    const { email, username, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if (!user) {
        return res.status(404)
            .json({
                message: "user not found"
            })
    }

   
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Password is Incorrect"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username:user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token);

    res.status(200).json({
        message: "login succefully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })

}


module.exports  = {
    registerController,
    loginController

}