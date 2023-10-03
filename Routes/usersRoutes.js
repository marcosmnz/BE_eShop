const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserData, updateUserData } = require('../Controllers/usersController');
const { protect } = require('../Middlewares/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUserData)
router.patch('/update/:id', protect, updateUserData)

module.exports = router;