import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

export const User = new model("User",userSchema);
