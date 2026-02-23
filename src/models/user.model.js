const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "user name already exist"],
        required:[true, "user name required"]
    },
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:[true,"email required"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    bio:String,
    profileImg:{
        type:String,
        default:""
    }
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;