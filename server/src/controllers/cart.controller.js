const Cart = require('../models/Cart.model');
const Product = require('../models/Product.model');

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // If cart doesn't exist, create an empty one
      const newCart = await Cart.create({
        user: req.user.id,
        items: [],
        totalPrice: 0,
        totalItems: 0,
      });
      
      return res.status(200).json({
        status: 'success',
        data: newCart,
      });
    }

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        status: 'fail',
        message: 'Insufficient stock',
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: req.user.id });

    // If cart doesn't exist, create one
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
        totalPrice: 0,
        totalItems: 0,
      });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product already exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Product does not exist in cart, add new item
      cart.items.push({
        product: productId,
        name: product.name,
        image: product.images.length > 0 ? product.images[0].url : '',
        price: product.price,
        quantity,
      });
    }

    // Calculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Save cart
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Quantity must be greater than 0',
      });
    }

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found',
      });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Item not found in cart',
      });
    }

    // Check product stock
    const product = await Product.findById(cart.items[itemIndex].product);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        status: 'fail',
        message: 'Insufficient stock',
      });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Save cart
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found',
      });
    }

    // Find item index
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Item not found in cart',
      });
    }

    // Remove item
    cart.items.splice(itemIndex, 1);

    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Save cart
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found',
      });
    }

    // Clear items
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    // Save cart
    await cart.save();

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared successfully',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}; 