import express from 'express'
import { isAdmin, requireLogin } from '../Middleware/AuthMiddleware.js';
import { AllOrders, Myorders, ProductFilter, UpdateStatus, allproduct, braintreePayment, braintreeToken, createProduct, deleteProduct, getSingleProduct, getcateProduct, productDetail, productPhoto, updateProduct } from '../Controller/ProductController.js';
import formidable from 'express-formidable'
const router = express.Router()

router.post('/create-product',requireLogin, isAdmin,formidable(), createProduct)
router.get('/all-product', allproduct)
router.get('/photo-product/:pid', productPhoto)
router.delete('/delete-product/:pid',requireLogin, isAdmin, deleteProduct)
router.put('/update-product/:id',requireLogin, isAdmin,formidable(), updateProduct)
router.get('/single-product/:id',requireLogin, isAdmin, getSingleProduct)
router.get('/cate-product/:slug',getcateProduct)
router.get('/product-detail/:slug',productDetail)
router.get('/braintree/token', braintreeToken)
router.post('/braintree/payment',requireLogin, braintreePayment)
router.get('/my-orders',requireLogin, Myorders)
router.get('/all-orders',requireLogin,isAdmin, AllOrders)
router.put('/updatestatus/:oid',requireLogin,isAdmin, UpdateStatus)
router.post('/productfilter', ProductFilter)

export default router;