import Product from "../Model/ProductModel.js";
import slugify from 'slugify'
import fs from 'fs'
import CategoryModel from "../Model/CategoryModel.js";
import OrderModel from "../Model/OrderModel.js";
import braintree from 'braintree'
import dotenv from 'dotenv'
import UserModel from "../Model/UserModel.js";
import { error } from "console";
import numeral from 'numeral'
dotenv.config()

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANTID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
});


export const createProduct = async (req, res) => {
    try {
        const { name, slug, desc, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        if (photo && photo.size > 1000000) {
            return res.json({ messege: "Photo should be less than 1mb." })
        }
        const product = new Product({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.json({
            messege: "Product created.",
            product
        })
    } catch (error) {
        console.log(error)
    }
}

export const allproduct = async (req, res) => {
    const products = await Product.find({}).select('-photo').populate('category').sort({createdAt: -1})
    res.json({
        messege: "All products",
        products
    })
}

export const productPhoto = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.pid)
        return res.json({ messege: "Product deleted successfully." })
    } catch (error) {
        console.log(error)
    }
}

export const getSingleProduct = async(req,res) => {
    try {
        const {id} = req.params
        const product = await Product.findOne({_id:id}).populate('category')
        res.json({messege: "Product fetched",product})
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req,res) => {
    try {
        const { name, slug, desc, price, category, quantity, shipping } = req.fields;
        const {photo} = req.files;
        const {id} = req.params;
        const updateProduct = await Product.findByIdAndUpdate(id, {...req.fields, slug:slugify(name)} , {new:true})
        if (photo) {
            updateProduct.photo.data = fs.readFileSync(photo.path)
            updateProduct.photo.contentType = photo.type
        }
        return res.json({
            messege: `${name} Updated.`,
            updateProduct
        })
    } catch (error) {
        console.log(error)
    }
}

export const getcateProduct = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug })
        const product = await Product.find({ category }).populate('category')
        return res.json({
            category,
            product,
        })
    } catch (error) {
        console.log(error)
    }
}


export const productDetail = async (req, res) => {
    try {
        const product = await Product.find({ slug: req.params.slug }).populate('category')
        return res.json({
            messege: "Product details.",
            product
        })
    } catch (error) {
        console.log(error)
    }
}

export const braintreeToken = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.json(err)
            } else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const braintreePayment = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0
        let quantity = 0
        cart.map((i) => {
            total = i.price * i.qnt + total;
            quantity = quantity + i.qnt;
        });
        const newtrans = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: { submitForSettlement: true },
        },
            async function (error, result) {
                if (result) {
                    const order = await new OrderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user
                    }).save()
                    if(result.success === "false") {
                        return res.jon(result.messege)
                    }else{
                        return res.json({ok:true})
                    }
                    res.json({ ok: true })
                } else {
                    res.send(error)
                }
            })

    } catch (error) {
        console.log(error)
    }

}

export const Myorders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ buyer:req.user._id }).populate('buyer').populate('products').sort({createdAt: -1})
        return res.json({
            messege: "My orders.",
            orders
        })

    } catch (error) {
        console.log(error)
    }
}

export const AllOrders = async (req,res) =>{
    try {
        const orders = await OrderModel.find({}).populate('buyer').populate('products').sort({createdAt: -1})
        return res.json({
            messege: "All orders.",
            orders
        })
    } catch (error) {
        console.log(error)
    }
}

export const UpdateStatus = async (req,res) => {
    try {
        const {oid} = req.params;
        const {status} = req.body
        const order = await OrderModel.findByIdAndUpdate(oid, {status}, {new:true})
        return res.json(order)
    } catch (error) {
        console.log(error)
    }
}


export const ProductFilter = async(req,res) => {
    const {checked,radio} = req.body;
    let args = {};
    if(checked?.length > 0) args.category = checked;
    const products = await Product.find(args)
    res.status(200).send({
        success:true,
        products
    })
}

