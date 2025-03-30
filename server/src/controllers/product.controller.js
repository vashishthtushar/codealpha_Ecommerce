const Product = require('../models/Product.model');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, brand, sortBy, minPrice, maxPrice, limit = 10, page = 1 } = req.query;
    
    // Build query
    const query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by brand
    if (brand) {
      query.brand = brand;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    // Build sort option
    let sortOption = {};
    if (sortBy) {
      const parts = sortBy.split(':');
      sortOption[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sortOption = { createdAt: -1 }; // Default: newest first
    }
    
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Execute query
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(Number(limit))
      .skip(skip);
    
    // Get total count for pagination
    const count = await Product.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: products.length,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      totalProducts: count,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    // Add seller info from authenticated user
    req.body.seller = req.user.id;
    
    const product = await Product.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Update product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Create product review
exports.createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }
    
    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user.id.toString()
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product already reviewed',
      });
    }
    
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user.id,
    };
    
    product.reviews.push(review);
    
    product.numReviews = product.reviews.length;
    
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    
    await product.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Review added',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
}; 