const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const cartController = require('../controllers/cart.controller');

// All cart routes are protected - requires authentication
router.use(protect);

// Get user's cart
router.get('/', cartController.getCart);

// Add item to cart
router.post('/', cartController.addItemToCart);

// Update cart item
router.put('/:itemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/:itemId', cartController.removeCartItem);

// Clear cart
router.delete('/', cartController.clearCart);

module.exports = router; 