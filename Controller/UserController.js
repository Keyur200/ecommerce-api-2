import UserModel from "../Model/UserModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import router from "../Route/UserRoute.js";
import dotenv from 'dotenv'
dotenv.config()
export const register = async (req,res) => {
    const {username,email,password,address,phno, role} = req.body;
    if(!username || !email || !password || !address || !phno || !role) {
        return res.status(201).json({mes:"Fill up all the fields."})
    }
    const emailCheck = await UserModel.findOne({email})
    if(emailCheck){
        return res.status(201).json({mes:"Email already used."})
    }
    const hashedPass = await bcrypt.hash(password, 10)
    const user = await UserModel({username,email,address,password: hashedPass,phno, role})
    user.save()
    res.json(user)
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    const emailCheck = await UserModel.findOne({email})
    if(!emailCheck) {
        return res.status(201).json({mes:"Incorrect email and password."})
    }
    else{
        const passCheck = bcrypt.compare(password, emailCheck.password) 
        if(!passCheck){
            return res.status(201).json({mes:"Incorrect email and password."})
        }
        
        jwt.sign({_id: emailCheck._id}, process.env.JWT_SECRET,{},(err,token) => {
            if(err) throw err;
            res.cookie('token',token, {
                httpOnly: true,
                    sameSite: "none",
                    secure: true,
            }).json({user:emailCheck,token})
        })
        // res.json({token, user: {
        //         username: emailCheck.username,
        //         email: emailCheck.email,
        //         address: emailCheck.address,
        //         phno: emailCheck.phno,
        //         role: emailCheck.role
        //     }})
        
    }
    // res.json()
}

export const data = async (req,res) =>{
    try {
        const {token} = req.cookies;
        if(token){
            jwt.verify(token,process.env.JWT_SECRET, {} , async (err,user) => {
                if(err) throw err;
                const {username,email,role,phno,address,wishlist,_id} = await UserModel.findById(user._id).populate({path:'wishlist', populate:{path:'category'}})
                res.json({_id,username,email,role,phno,address,wishlist,token})
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateprofile = async (req,res) => {
    try {
        const {username,email,password,address,phno} = req.body;
        const hashedPass = password ? await bcrypt.hash(password,10) : undefined
            const updateUser = await UserModel.findByIdAndUpdate(req.user._id, {
                username :username || req.user.username,
                password :hashedPass || req.user.password,
                address :address || req.user.address,
                phno :phno || req.user.phno,
            },{new:true})
            res.status(200).send({
                messege: "success",
                updateUser 
            })
    } catch (error) {
        console.log(error)
    }
}


export const addTowish  = async(req,res) => {
    const {pid} = req.body;
    const check = await UserModel.findOne({ wishlist: { $in : [pid]}})
    if(check){
        return res.json({error : "This item is already in wishlist"});
    }else{
        const product = await UserModel.findByIdAndUpdate(req.user._id, {
            $push: {wishlist: pid}
        },{new:true}).populate('wishlist')
        return res.json({messege: ` added to wishlist.`,product})
    }
}

export const deleteWish = async(req,res) =>{
    const {pid} = req.body;
    const product = await UserModel.findByIdAndUpdate(req.user._id, {
         $pull: {wishlist:pid}
    },{new:true})
    return res.json(product)
}


export const logout = (req,res)=> {
    res.cookie('token', '', {
        httpOnly: true,
                    sameSite: "none",
                    secure: true,
    }).json("Logout")
}

