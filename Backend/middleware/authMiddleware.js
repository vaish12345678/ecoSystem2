import jwt from "jsonwebtoken";

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
        const decode= await jwt.verify(token,process.env.SECRET_KEY);//it verifies that token not expired and valid
        if(!decode){
            return res.status(401).json({
                message:"inavalid",
                success:false,
            })
        };
        //if decode present
        req.id=decode.userId;
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


