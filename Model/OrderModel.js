import mongoose, { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    products: [{type:Schema.Types.ObjectId, ref: "Product"},],
    payment:{},
    buyer:{type:Schema.Types.ObjectId, ref: "User"},
    status:{type:String, default:"Not Process", enum: ["Not Process","Processing","Shipped","Deliverd","Cancel"]}
},{timestamps:true})

const Order = model("Order", OrderSchema)

export default Order
