# LuxeCart E-Commerce API

Backend API for the LuxeCart e-commerce platform.

## Features

- User authentication and authorization
- Product management
- Cart functionality
- Order processing
- Admin dashboard
- Payment integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/luxecart
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```
5. Start the development server
   ```
   npm run dev
   ```

### API Endpoints

#### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

#### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

#### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

#### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin only)

## Development

To run the server in development mode with hot reloading:

```
npm run dev
```

## Production

To start the server in production mode:

```
npm start
``` 