const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth.middleware');
const productController = require('../controllers/product.controller');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Protected routes (admin only)
router.post('/', protect, restrictTo('admin'), productController.createProduct);
router.put('/:id', protect, restrictTo('admin'), productController.updateProduct);
router.delete('/:id', protect, restrictTo('admin'), productController.deleteProduct);

// Product reviews
router.post('/:id/reviews', protect, productController.createProductReview);

// Test route to get sample products
router.get('/test/samples', (req, res) => {
  const sampleProducts = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium wireless headphones with noise cancellation and long battery life.',
      price: 199.99,
      discountedPrice: 179.99,
      images: [{ public_id: 'sample1', url: 'https://via.placeholder.com/500' }],
      category: 'Electronics',
      brand: 'SoundMaster',
      stock: 15,
      ratings: 4.5,
      numReviews: 12
    },
    {
      _id: '2',
      name: 'Smartphone X',
      description: 'Latest smartphone with high-resolution camera and powerful processor.',
      price: 899.99,
      discountedPrice: 849.99,
      images: [{ public_id: 'sample2', url: 'https://via.placeholder.com/500' }],
      category: 'Electronics',
      brand: 'TechPro',
      stock: 8,
      ratings: 4.8,
      numReviews: 24
    },
    {
      _id: '3',
      name: 'Designer Watch',
      description: 'Elegant watch with premium materials and precise timekeeping.',
      price: 299.99,
      discountedPrice: 279.99,
      images: [{ public_id: 'sample3', url: 'https://via.placeholder.com/500' }],
      category: 'Jewelry',
      brand: 'TimeMaster',
      stock: 20,
      ratings: 4.7,
      numReviews: 18
    }
  ];

  res.status(200).json({
    status: 'success',
    results: sampleProducts.length,
    data: sampleProducts
  });
});

module.exports = router; 