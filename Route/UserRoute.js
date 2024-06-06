import express from "express";
import { addTowish, data, deleteWish, login, logout, register, updateprofile } from "../Controller/UserController.js";
import  {isAdmin, requireLogin}  from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.put('/profile',requireLogin, updateprofile)
router.get('/data', data)
router.post('/logout',requireLogin, logout)
router.put('/addtowish',requireLogin, addTowish)
router.put('/deletewish',requireLogin, deleteWish)

export default router