import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true
    },
    email:{
        true:String,
        required:[true,"Please provide Email"],
        unique:true
    },
    password:{
        true:String,
        required:[true,"Please provide password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpire:Date,
    verifyToken:String,
    verifyTokenExpire:Date,
})

const User=mongoose.models.users || mongoose.model("users",userSchema);

export default User;