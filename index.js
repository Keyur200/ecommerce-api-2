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

app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())

app.use('/', userRoute)
app.use('/', categoryRoute)
app.use('/', productRoute)

mongoose.connect(process.env.MONGO_URL).then(res=>console.log("MongoDB connected")).catch(err=>console.log(err))
app.listen(process.env.PORT,() => console.log(`Running on ${process.env.PORT} port.`))