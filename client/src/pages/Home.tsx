import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSampleProducts } from '../api'
// Use an online image URL instead of local file
const heroImageUrl = 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

interface Product {
  _id: string
  name: string
  price: number
  discountedPrice?: number
  images: Array<{
    public_id: string
    url: string
  }>
  category: string
  ratings: number
  brand: string
}

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await getSampleProducts()
        if (response.data && response.data.data) {
          // In a real app, we would filter for featured products
          // For now, just use the first 3 from the sample data
          setFeaturedProducts(response.data.data.slice(0, 3))
        } else {
          // Fallback to mock data
          setFeaturedProducts(getMockFeaturedProducts())
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching featured products:', err)
        setError('Failed to load featured products')
        setFeaturedProducts(getMockFeaturedProducts())
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getMockFeaturedProducts = (): Product[] => {
    return [
      {
        _id: "1",
        name: "Premium Leather Jacket",
        price: 299.99,
        discountedPrice: 249.99,
        images: [{ 
          public_id: "jacket1", 
          url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        }],
        category: "Clothing",
        ratings: 4.5,
        brand: "LuxeStyle"
      },
      {
        _id: "2",
        name: "Wireless Noise-Canceling Headphones",
        price: 199.99,
        images: [{ 
          public_id: "headphones1", 
          url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80"
        }],
        category: "Electronics",
        ratings: 4.8,
        brand: "AudioPro"
      },
      {
        _id: "3",
        name: "Minimalist Watch",
        price: 149.99,
        discountedPrice: 129.99,
        images: [{ 
          public_id: "watch1", 
          url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
        }],
        category: "Jewelry",
        ratings: 4.3,
        brand: "TimeMaster"
      }
    ]
  }

  const categories = [
    {
      id: 1,
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      link: "/shop?category=clothing"
    },
    {
      id: 2,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1201&q=80",
      link: "/shop?category=electronics"
    },
    {
      id: 3,
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      link: "/shop?category=home"
    },
    {
      id: 4,
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      link: "/shop?category=beauty"
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: `url(${heroImageUrl})` 
          }}
        ></div>
        <div className="container relative z-10 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Elevate Your Lifestyle
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover premium products curated for the modern lifestyle. Quality, elegance, and innovation at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop" 
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition-colors"
            >
              Shop Now
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-md font-medium transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <Link 
                  key={product._id} 
                  to={`/product/${product._id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                      <img 
                        src={product.images[0].url} 
                        alt={product.name} 
                        className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-xl font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link 
              to="/shop" 
              className="inline-block px-8 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-md font-medium transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={category.link}
                className="group relative rounded-lg overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
                  <p className="mt-2 text-indigo-300 group-hover:text-indigo-200 transition-colors">
                    Shop Now <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 bg-indigo-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-8">
              At LuxeCart, we believe that quality doesn't have to be expensive. We curate the finest products from around the world, bringing elegance and style to your everyday life. Our mission is to help you discover products that reflect your unique personality and elevate your lifestyle.
            </p>
            <Link 
              to="/about" 
              className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
            <p className="text-lg text-gray-300 mb-8">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 