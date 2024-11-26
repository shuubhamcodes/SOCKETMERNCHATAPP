import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetcookie from "../utils/generateToken.js";
export const login = async(req,res)=>{
   try {
    const{username,password} = req.body; //get request from users
    const user = await User.findOne({username}); //check users exists or not
    const isPasswordCorrect =  await bcrypt.compare(password,user?.password || " " );

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid Username or Password"});
    }
generateTokenAndSetcookie(user._id,res);


res.status(200).json({
    _id:user._id,
    fullname:user.fullname,
    username:user.username,
    profilePic:user.profilePic,
});
   } catch (error) {
    console.log("Error in signup controller" ,error.message);
    res.status(500).json({error:"Internal server error"});
   }
}

export const logout =async(req,res)=>{
    try{
  res.cookie("jwt","",{maxAge:0})
  res.status(200).json({message:"Logged out successfully"})
    }catch(error){
    console.log("error in login controller ",error.message);
    res.status(500).json({error:"Internal Server Error"});
    }
}


export const signup= async(req,res)=>{
    try{
        const{fullname,username,password,confirmPassword,gender}=req.body;
        if(password!=confirmPassword){
            return res.status (400).json({error:"passwords don't match"});
        }
        
        const user =  await User.findOne({username});
       
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

     //Hash Password Here
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(password,saltRounds);

    //  https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = 'https://avatar.iran.liara.run/public/boy?username = ${username}'
    const girlProfilePic = 'https://avatar.iran.liara.run/public/boy?username = ${username}'
    
    const newUser = new User({
        fullname,
        username,
        password: hashedPassword ,
        gender,
        profilePic:gender === "male"?boyProfilePic : girlProfilePic
    })
  if(newUser){
    await  newUser.save();
    generateTokenAndSetcookie(newUser._id,res);
    res.status(201).json({
       _id:newUser._id,
       fullname: newUser.fullname,
       username: newUser.username,
       profilePic:newUser.profilePic,
    });
  }else{
    res.status(400).json({error:"Invalid "})
  }



    }catch(error){
          console.log("Error in signup controller" ,error.message);
          res.status(500).json({error:"Internal server error"});
    }
    
}
