// Mock data for the e-commerce application

export const products = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    discountedPrice: 99.99,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. These headphones provide incredible sound quality and comfort for extended listening sessions.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        alt: 'Wireless Headphones'
      }
    ],
    category: '1',
    ratings: 4.5,
    inStock: true,
    reviews: 120
  },
  {
    _id: '2',
    name: 'Smartphone XS',
    price: 899.99,
    discountedPrice: 799.99,
    description: 'The latest smartphone with a 6.5-inch OLED display, 128GB storage, and a triple camera system. Features all-day battery life and the fastest processor available.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        alt: 'Smartphone XS'
      }
    ],
    category: '2',
    ratings: 4.7,
    inStock: true,
    reviews: 245
  },
  {
    _id: '3',
    name: 'Laptop Pro',
    price: 1499.99,
    discountedPrice: null,
    description: 'Powerful laptop with 16GB RAM, 512GB SSD, and a 15-inch display. Perfect for professionals and creatives who need performance on the go.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1626&q=80',
        alt: 'Laptop Pro'
      }
    ],
    category: '3',
    ratings: 4.8,
    inStock: true,
    reviews: 189
  },
  {
    _id: '4',
    name: 'Smart Watch',
    price: 299.99,
    discountedPrice: 249.99,
    description: 'Track your fitness, receive notifications, and more with this waterproof smart watch. Features heart rate monitoring and 7-day battery life.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80',
        alt: 'Smart Watch'
      }
    ],
    category: '4',
    ratings: 4.3,
    inStock: true,
    reviews: 156
  },
  {
    _id: '5',
    name: 'Bluetooth Speaker',
    price: 79.99,
    discountedPrice: 59.99,
    description: 'Portable Bluetooth speaker with 20-hour battery life and waterproof design. Perfect for outdoor adventures or use around the home.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618624554804-259b9efe1d59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        alt: 'Bluetooth Speaker'
      }
    ],
    category: '1',
    ratings: 4.1,
    inStock: true,
    reviews: 98
  },
  {
    _id: '6',
    name: 'Digital Camera',
    price: 699.99,
    discountedPrice: null,
    description: 'Capture your memories with this high-resolution digital camera. Features 4K video recording and advanced autofocus system.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80',
        alt: 'Digital Camera'
      }
    ],
    category: '5',
    ratings: 4.6,
    inStock: true,
    reviews: 112
  }
];

export const categories = [
  {
    id: '1',
    name: 'Audio'
  },
  {
    id: '2',
    name: 'Smartphones'
  },
  {
    id: '3',
    name: 'Computers'
  },
  {
    id: '4',
    name: 'Wearables'
  },
  {
    id: '5',
    name: 'Cameras'
  }
];

export const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In a real app, this would be hashed
    isAdmin: false
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    isAdmin: true
  }
]; 