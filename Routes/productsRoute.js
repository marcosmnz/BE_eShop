const express = require('express');
const router = express.Router();
const { protect } = require('../Middlewares/authMiddleware')
const { getProducts, createProduct } = require('../Controllers/productsController')


router.get('/', getProducts);
router.post('/create',protect, createProduct);


module.exports = router
