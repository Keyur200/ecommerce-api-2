import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name:{type:String, required:true, unique:true},
    slug:{type:String, required:true},
    desc:{type:String, required:true},
    price:{type:String, required:true},
    category:{type: Schema.Types.ObjectId, ref:"Category"},
    quantity:{type:String, required:true},
    photo:{data:Buffer,contentType:String},
    shipping:{type:String,required:true}
},{timestamps:true})

const Product = model("Product", ProductSchema)

export default Product
