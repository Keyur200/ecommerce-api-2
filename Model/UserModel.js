import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    phno: {type:String, required:true},
    address: {type:String, required:true},
    role: {type:String, required: true},
    wishlist: [{type:Schema.Types.ObjectId, ref:"Product"}]
}, {timestamps:true})

const UserModel = model("User", UserSchema)
export default UserModel