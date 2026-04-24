import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {RefreshToken} from "../models/RefreshToken.js"
dotenv.config();
const AuthRouter = Router();
let saltRounds = 10;
AuthRouter.post("/create-account",async(req,res)=>{
  console.log("signup auth is called")
   try{
    
     const {name,email,password} = req.body
     console.log(req.body)
    if(!name || !email || !password){
        return res.status(400).json({
            message:"username,email,password are required"
        });
    }
    const existingUser =await  User.findOne({email});
    
    if(existingUser)  return res.status(400).json({
         message: "Email already exists"
      });
    
    let hashedPassword = await bcrypt.hash(password,saltRounds)
    const newUser = await User.create({
        name,
        email,
        password:hashedPassword
    }) 
    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id
    });
   }catch(e){
    console.log(e);
     return res.status(500).json({
        message:"Internal server error"
     })
   }
});
AuthRouter.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"email,password are required"
        });
    }
   const isUser = await User.findOne({email});
   if(!isUser) return res.status(404).json({
    message:"Invalid credentials"
   });
   const isMatch =await bcrypt.compare(password,isUser.password)
   if(!isMatch){
        return res.status(400).json({
            message:"Invalid credentials"
        })
   }
   //access token (short-lived)
   const accessToken = jwt.sign(
      { userId: isUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    //Refresh Token (long-lived)
    const refreshToken = jwt.sign(
      { userId: isUser._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    //store refreshtoken
     await RefreshToken.create({
      userId: isUser._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    //Send refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });

   return res.status(200).json({
    accessToken
   })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            messgae:"internal server error"
        })
    }
})
AuthRouter.post("/refresh", async (req, res) => {
  try {
    console.log("refresh",req.cookies)
    const token = req.cookies.refreshToken;
    

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Check DB
    const storedToken = await RefreshToken.findOne({ token });
    console.log("/refresh",storedToken)
    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    await RefreshToken.deleteOne({ token });
    const newRefreshToken = jwt.sign(
        { userId: decoded.userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    //store refreshtoken
     await RefreshToken.create({
      userId:  decoded.userId,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    //Send refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });
    
    return res.json({
      accessToken: newAccessToken
    });

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
});
AuthRouter.post("/logout", async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    await RefreshToken.deleteOne({ token });
  }

  res.clearCookie("refreshToken");

  return res.json({
    message: "Logged out successfully"
  });
});
export default AuthRouter