import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
const isAuthenticated= async(req, res, next)=>{
    try{
        const token= req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"user not Authenticated",
                success:false,
            })
        }
        //if present
        // const decode= await jwt.verify(token,process.env.SECRET_KEY);//it verifies that token not expired and valid
        //  const user = await User.findById(decode.id);
        // if(!decode){
        //     return res.status(401).json({
        //         message:"inavalid",
        //         success:false,
        //     })
        // };
        //if decode present
         const decoded=  jwt.verify(token,process.env.SECRET_KEY);
          const user = await User.findById(decoded.userId);

    if(!user){
        return res.status(401).json({
            message:"User not found",
            success:false,
        });
    }

        req.user=user,
        req.role=decoded.role
        req.id=decoded.userId;
        next();
    }catch(error){

           console.log(error);
           return res.status(500).json({
            message:"Authentication failed",
            success:false,
            error:error.message,
           });
}
}

export default isAuthenticated


