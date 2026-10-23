// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/cart', protect, addToCart);
router.put('/cart/:id', protect, updateCartItem);
router.delete('/cart/:id', protect, removeFromCart);

module.exports = router;