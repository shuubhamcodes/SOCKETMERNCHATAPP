import jwt from 'jsonwebtoken';

const protectRoute = async (req,res,next)=>{
    try{
 const token = req.cookies.jwt;
 if(!token){
    return res.status(401).json({error:"Unauthorized -No token Provided"});
 }

 const decoded = jwt.verify(token,process.env.JWT_SECRET);

 if(!decoded){
    return res.status(401).json({error:"Unauthorized -Invalid token"})
 }

 const user = await user.findById(decoded.userId).select("-password");

 if(!user){
    return res.status(404).json({error:"User not found"});
 }


 req.user = user;
 next();

    }catch(error){

    }
}


export default protectRoute;