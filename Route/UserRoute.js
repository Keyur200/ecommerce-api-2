const express =  require("express")
const { addTowish, data, deleteWish, login, logout, register, updateprofile } =  require("../Controller/UserController.js")
const  {isAdmin, requireLogin}  =  require("../Middleware/AuthMiddleware.js")

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.put('/profile',requireLogin, updateprofile)
router.get('/data', data)
router.post('/logout',requireLogin, logout)
router.put('/addtowish',requireLogin, addTowish)
router.put('/deletewish',requireLogin, deleteWish)

module.exports = router