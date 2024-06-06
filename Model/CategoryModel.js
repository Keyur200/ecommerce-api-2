const mongoose =  require("mongoose")

const CategorySchema = new Schema({
    name: {type:String,unique:true,required:true},
    slug: {type:String, lowercase: true},
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref: "User"}
},{timestamps:true})

const CategoryModel = mongoose.model("Category", CategorySchema)
export default CategoryModel

