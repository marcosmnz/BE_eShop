const express = require('express');
const router = express.Router();
const { protect } = require('../Middlewares/authMiddleware')
const { getProducts, createProduct, updateProduct, softDeleteProduct } = require('../Controllers/productsController')


router.get('/', getProducts);
router.post('/create',protect, createProduct);
router.patch('/update/:id', protect, updateProduct);
router.patch('/delete/:id', protect, softDeleteProduct);



module.exports = router
