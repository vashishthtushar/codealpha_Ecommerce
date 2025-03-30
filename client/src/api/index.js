import axios from 'axios';
import { products, categories, users } from './mockData';

// Flag to determine if we should use mock data
const USE_MOCK_DATA = true;

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for adding auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Products API
export const getProducts = (params) => {
  if (USE_MOCK_DATA) {
    return Promise.resolve({ data: products });
  }
  return API.get('/products', { params });
};

export const getProductById = (id) => {
  if (USE_MOCK_DATA) {
    const product = products.find(p => p._id === id);
    return Promise.resolve({ data: product || null });
  }
  return API.get(`/products/${id}`);
};

export const getSampleProducts = () => {
  if (USE_MOCK_DATA) {
    return Promise.resolve({ data: products });
  }
  return API.get('/products/test/samples');
};

export const getCategories = () => {
  if (USE_MOCK_DATA) {
    return Promise.resolve({ data: categories });
  }
  return API.get('/categories');
};

// Auth API
export const login = (credentials) => {
  if (USE_MOCK_DATA) {
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      // Simulate a JWT token
      const token = `mock-jwt-token-${Date.now()}`;
      localStorage.setItem('token', token);
      return Promise.resolve({ 
        data: { 
          token,
          user: { 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin 
          } 
        } 
      });
    }
    return Promise.reject({ response: { data: { message: 'Invalid credentials' } } });
  }
  return API.post('/users/login', credentials);
};

export const register = (userData) => {
  if (USE_MOCK_DATA) {
    // Check if user with email already exists
    if (users.some(u => u.email === userData.email)) {
      return Promise.reject({ 
        response: { data: { message: 'User with this email already exists' } } 
      });
    }
    
    // Create new user
    const newUser = {
      id: `${users.length + 1}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      isAdmin: false
    };
    
    users.push(newUser);
    
    // Simulate a JWT token
    const token = `mock-jwt-token-${Date.now()}`;
    localStorage.setItem('token', token);
    
    return Promise.resolve({ 
      data: { 
        token,
        user: { 
          id: newUser.id, 
          name: newUser.name, 
          email: newUser.email, 
          isAdmin: newUser.isAdmin 
        } 
      } 
    });
  }
  return API.post('/users/register', userData);
};

export const getUserProfile = () => {
  if (USE_MOCK_DATA) {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd decode the JWT to get the user ID
      const mockUser = users[0];
      return Promise.resolve({ 
        data: { 
          id: mockUser.id, 
          name: mockUser.name, 
          email: mockUser.email, 
          isAdmin: mockUser.isAdmin 
        } 
      });
    }
    return Promise.reject({ response: { data: { message: 'Not authorized' } } });
  }
  return API.get('/users/profile');
};

export const updateUserProfile = (userData) => {
  if (USE_MOCK_DATA) {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd update the user in the database
      return Promise.resolve({ 
        data: { 
          id: '1', 
          name: userData.name, 
          email: userData.email, 
          isAdmin: false 
        } 
      });
    }
    return Promise.reject({ response: { data: { message: 'Not authorized' } } });
  }
  return API.put('/users/profile', userData);
};

// Cart API - Using localStorage for mock implementation
let mockCart = JSON.parse(localStorage.getItem('mockCart')) || { items: [] };

export const getCart = () => {
  if (USE_MOCK_DATA) {
    return Promise.resolve({ data: mockCart });
  }
  return API.get('/cart');
};

export const addToCart = (productData) => {
  if (USE_MOCK_DATA) {
    const existingItemIndex = mockCart.items.findIndex(item => item.product._id === productData.productId);
    
    if (existingItemIndex >= 0) {
      mockCart.items[existingItemIndex].quantity += productData.quantity;
    } else {
      const product = products.find(p => p._id === productData.productId);
      if (product) {
        mockCart.items.push({
          _id: `cart-item-${Date.now()}`,
          product,
          quantity: productData.quantity,
          price: product.discountedPrice || product.price
        });
      }
    }
    
    localStorage.setItem('mockCart', JSON.stringify(mockCart));
    return Promise.resolve({ data: mockCart });
  }
  return API.post('/cart', productData);
};

export const updateCartItem = (itemId, data) => {
  if (USE_MOCK_DATA) {
    const itemIndex = mockCart.items.findIndex(item => item._id === itemId);
    if (itemIndex >= 0) {
      mockCart.items[itemIndex].quantity = data.quantity;
      localStorage.setItem('mockCart', JSON.stringify(mockCart));
    }
    return Promise.resolve({ data: mockCart });
  }
  return API.put(`/cart/${itemId}`, data);
};

export const removeCartItem = (itemId) => {
  if (USE_MOCK_DATA) {
    mockCart.items = mockCart.items.filter(item => item._id !== itemId);
    localStorage.setItem('mockCart', JSON.stringify(mockCart));
    return Promise.resolve({ data: mockCart });
  }
  return API.delete(`/cart/${itemId}`);
};

export const clearCart = () => {
  if (USE_MOCK_DATA) {
    mockCart = { items: [] };
    localStorage.setItem('mockCart', JSON.stringify(mockCart));
    return Promise.resolve({ data: mockCart });
  }
  return API.delete('/cart');
};

// Orders API
const mockOrders = [];

export const createOrder = (orderData) => {
  if (USE_MOCK_DATA) {
    const newOrder = {
      _id: `order-${Date.now()}`,
      user: '1',
      items: [...mockCart.items],
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentResult: {
        id: `payment-${Date.now()}`,
        status: 'completed',
        update_time: new Date().toISOString(),
        email_address: 'customer@example.com'
      },
      totalPrice: mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      isPaid: true,
      paidAt: new Date().toISOString(),
      isDelivered: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockOrders.push(newOrder);
    
    // Clear cart after successful order
    mockCart = { items: [] };
    localStorage.setItem('mockCart', JSON.stringify(mockCart));
    
    return Promise.resolve({ data: newOrder });
  }
  return API.post('/orders', orderData);
};

export const getOrders = () => {
  if (USE_MOCK_DATA) {
    return Promise.resolve({ data: mockOrders });
  }
  return API.get('/orders');
};

export const getOrderById = (id) => {
  if (USE_MOCK_DATA) {
    const order = mockOrders.find(o => o._id === id);
    return Promise.resolve({ data: order || null });
  }
  return API.get(`/orders/${id}`);
};

export default API; 