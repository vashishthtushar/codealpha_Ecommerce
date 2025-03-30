import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { StarIcon, ShoppingCartIcon, HeartIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'

interface ProductDetailsProps {
  addToCart: (product: any) => void
}

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // Simulating API request
    setTimeout(() => {
      const mockProduct = {
        id: parseInt(id || '1'),
        name: "Premium Leather Jacket",
        price: 299.99,
        discount: 10, // percentage
        rating: 4.5,
        reviewCount: 127,
        description: "Crafted from premium full-grain leather, this classic jacket features a timeless design that will never go out of style. The soft, supple leather molds to your body for a custom fit, while the durable construction ensures longevity. Lined with premium materials for comfort in any season.",
        features: [
          "100% full-grain premium leather",
          "Water-resistant treatment",
          "Quilted lining for extra warmth",
          "Multiple interior and exterior pockets",
          "YKK premium zippers",
          "Classic fit"
        ],
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
          "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1566491888763-e71518bbe846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        ],
        colors: [
          { name: "Black", value: "#000000" },
          { name: "Brown", value: "#8B4513" },
          { name: "Tan", value: "#D2B48C" }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        category: "clothing",
        inStock: true,
        availableQuantity: 24
      }
      
      setProduct(mockProduct)
      setSelectedColor(mockProduct.colors[0].name)
      setSelectedSize(mockProduct.sizes[2]) // Medium as default
      setIsLoading(false)
    }, 800)
  }, [id])
  
  const handleQuantityChange = (value: number) => {
    if (value < 1) return
    if (product && value > product.availableQuantity) return
    setQuantity(value)
  }
  
  const handleAddToCart = () => {
    if (!product) return
    
    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      quantity
    }
    
    addToCart(productToAdd)
  }
  
  const discountedPrice = product ? product.price * (1 - product.discount / 100) : 0
  
  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }
  
  return (
    <div className="bg-white">
      <div className="container py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/shop?category=${product.category}`} className="text-gray-500 hover:text-gray-700 capitalize">
            {product.category}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button 
                  key={index} 
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1} of product`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Image ${index + 1}`} 
                    className="w-full h-full object-center object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <span key={rating}>
                      {product.rating > rating ? (
                        <StarIconSolid className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                      )}
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{product.reviewCount} reviews</span>
              </div>
              
              <div className="flex items-center mb-6">
                {product.discount > 0 ? (
                  <>
                    <p className="text-3xl font-bold text-indigo-600 mr-4">
                      ${discountedPrice.toFixed(2)}
                    </p>
                    <p className="text-xl text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </p>
                    <span className="ml-4 py-1 px-2 bg-red-100 text-red-700 text-sm font-medium rounded">
                      {product.discount}% OFF
                    </span>
                  </>
                ) : (
                  <p className="text-3xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
              
              {/* Colors */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-4">
                  {product.colors.map((color: any) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-10 h-10 rounded-full ${
                        selectedColor === color.name ? 'ring-2 ring-offset-2 ring-indigo-600' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Select color: ${color.name}`}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sizes */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <Link to="/size-guide" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </Link>
                </div>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        py-2 px-4 border rounded-md text-sm font-medium 
                        ${selectedSize === size 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }
                      `}
                      aria-label={`Select size: ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2 text-gray-600 hover:text-indigo-600"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max={product.availableQuantity}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-12 text-center border-none focus:outline-none focus:ring-0"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-indigo-600"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to cart buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center py-3 px-8 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  className="flex-1 flex items-center justify-center py-3 px-8 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </button>
              </div>
              
              {/* Product Features */}
              <div className="border-t border-b border-gray-200 py-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Features</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews section would go here */}
        
        {/* Related products section would go here */}
        
        <div className="mt-12">
          <Link to="/shop" className="flex items-center text-indigo-600 hover:text-indigo-800">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails 