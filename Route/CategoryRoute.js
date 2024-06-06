import express from 'express'
import { isAdmin, requireLogin } from '../Middleware/AuthMiddleware.js'
import { createcate, deletecate, findall, updatecate } from '../Controller/CategoryController.js'
const router = express.Router()

router.post('/createcate', requireLogin,isAdmin, createcate)
router.get('/getcate', findall)
router.delete('/deletecate/:id', requireLogin,isAdmin, deletecate)
router.put('/updatecate/:id', requireLogin,isAdmin, updatecate)

export default router