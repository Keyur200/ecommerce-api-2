import mongoose, { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: {type:String,unique:true,required:true},
    slug: {type:String, lowercase: true},
    createdBy: {type:Schema.Types.ObjectId, ref: "User"}
},{timestamps:true})

const CategoryModel = model("Category", CategorySchema)
export default CategoryModel

