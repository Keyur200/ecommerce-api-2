const express = require('express')
const { isAdmin, requireLogin } = require('../Middleware/AuthMiddleware.js')
const { createcate, deletecate, findall, updatecate } = require('../Controller/CategoryController.js')
const router = express.Router()

router.post('/createcate', requireLogin,isAdmin, createcate)
router.get('/getcate', findall)
router.delete('/deletecate/:id', requireLogin,isAdmin, deletecate)
router.put('/updatecate/:id', requireLogin,isAdmin, updatecate)

module.exports = router