
import {User} from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register= async(req,res)=>{
    try{
        const{fullname,email,password,role}=req.body;
        if(!fullname||!email ||  !password || !role){
            return  res.status(400).json({
                message:"something is missing",
                success:false,
            });
        };
        const user= await User.findOne({email});//user find out by email
        if(user){
            return res.status(400).json({
                message:"user already exists",
                success:false,
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
          
            password:hashedPassword,
            role
        });
        return res.status(201).json({
            message:"Account create successfully",
            success:true,
        })
    }catch(error){
       console.log(error);
    }
}

export const login=async(req,res)=>{
   try{
    const {email,password,role}=req.body;
    if(!email|| !password||!role){
        return res.status(400).json({
            message:"something is missing",
            success:false,
        });

    };

    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"Incorrect email or password",
            success:false,
        });
    } 

    const isPasswordMatch= await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Incorrect email or password",
            success:false,
        });
    }

    if(role!=user.role){
        return res.status(400).json({
            message:"Check your role properly",
            success:false,
        });
    };

    const tokenData={
        userId:user._id,
        role:user.role
    }
    const token =  await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});//creating a token
    user={
        _id:user._id,
        fullname:user.fullname,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    }

    return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
        message:`welcome back ${user.fullname}`,
        user,
        success:true,

    })
}

   catch(error){
        console.log(error);
   }
}

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password"); // don't return password
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", " ", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "logout successfully",

        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed", success: false });
  }
};

