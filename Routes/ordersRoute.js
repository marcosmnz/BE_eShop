const express = require('express');
const router = express.Router();
const { protect } = require('../Middlewares/authMiddleware')
const {getOrder, createOrder, updateOrder, softDeleteOrder} = require('../Controllers/ordersController')


router.get('/', protect, getOrder)
router.post('/create', protect, createOrder)
router.patch('/update/:id', protect, updateOrder)
router.patch('/delete/:id', protect, softDeleteOrder)


module.exports = router