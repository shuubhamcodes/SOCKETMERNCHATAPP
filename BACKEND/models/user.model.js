import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname :{
        type:String,
        Required:true,
    },
    username:{
        type:String,
        Required: true,
        unique: true,

    },
    password:{
        type:String,
        Required:true,
        minlength:6,

    },
    gender:{
        type:String,
        required: true,
        enum:["male","female"],

    },
    profilePic:{
        type: String,
        default: " ",
    }


})

const User = mongoose.model("User",userSchema);
export default User;
