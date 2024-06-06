const jwt = require('jsonwebtoken')
const UserModel = require('../Model/UserModel.js')

export const requireLogin = async(req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(201).json({error: "You must login."})
    }
    
    jwt.verify(token, process.env.JWT_SECRET,{}, (err,payload)=>{
        if(err){
            return res.status(201).json({error: "You must login."})
        }else{
            const {_id} = payload
            UserModel.findById(_id).then(userData=>{
            req.user = userData           
            next()
        })
        }
        
    })
}

export const isAdmin = async(req,res,next) => {
    try {
        const user = await UserModel.findById(req.user._id)
        if(user.role !== "admin"){
            return res.status(401).send({
                error: "Unauthorized user"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
    }
}