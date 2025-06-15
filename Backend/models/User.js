
import mongoose from  "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
         required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['customer','retailer'],
        default:'customer',
        required:true,
    },
});

export const User=  mongoose.model("User",userSchema);
