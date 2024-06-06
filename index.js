import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './Route/UserRoute.js'
import categoryRoute from './Route/CategoryRoute.js'
import productRoute from './Route/ProductRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
dotenv.config();

app.use(cors({ origin: ["https://ecommerce-plum-theta.vercel.app"], methods: ["POST","PUT","DELETE","GET"] ,credentials:true}))
app.use(express.json())
app.use(cookieParser())
mongoose.connect(process.env.MONGO_URL).then(res=>console.log("MongoDB connected")).catch(err=>console.log(err))

app.use('/', userRoute)
app.use('/', categoryRoute)
app.use('/', productRoute)

app.listen(process.env.PORT,() => console.log(`Running on ${process.env.PORT} port.`))