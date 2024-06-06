import { Schema } from "mongoose"

const mongoose = require("mongoose")

const OrderSchema = new Schema({
    products: [{type:Schema.Types.ObjectId, ref: "Product"},],
    payment:{},
    buyer:{type:Schema.Types.ObjectId, ref: "User"},
    status:{type:String, default:"Not Process", enum: ["Not Process","Processing","Shipped","Deliverd","Cancel"]}
},{timestamps:true})

const Order = mongoose.model("Order", OrderSchema)

export default Order
