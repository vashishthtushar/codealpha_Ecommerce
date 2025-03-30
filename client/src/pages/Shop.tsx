import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FilterIcon, 
  ViewGridIcon, 
  ViewListIcon, 
  AdjustmentsIcon, 
  XIcon 
} from '@heroicons/react/outline'
import { getSampleProducts } from '../api'

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
  description: string
  stock: number
}

const Shop = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const categoryParam = queryParams.get('category')

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGridView, setIsGridView] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortOption, setSortOption] = useState('featured')
  const [error, setError] = useState<string | null>(null)
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await getSampleProducts()
        if (response.data && response.data.data) {
          setProducts(response.data.data)
        } else {
          // Fallback to mock data if the API doesn't return data in expected format
          setProducts(getMockProducts())
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
        // Fallback to mock data on error
        setProducts(getMockProducts())
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Function to get mock products as fallback
  const getMockProducts = () => {
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
        brand: "LuxeStyle",
        description: "Premium quality leather jacket with modern design.",
        stock: 25
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
        brand: "AudioPro",
        description: "High-quality wireless headphones with active noise cancellation.",
        stock: 42
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
        brand: "TimeMaster",
        description: "Elegant minimalist watch with premium materials.",
        stock: 18
      }
    ]
  }

  useEffect(() => {
    if (selectedCategory) {
      const params = new URLSearchParams(location.search)
      params.set('category', selectedCategory)
      window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`)
    } else if (categoryParam && location.search) {
      window.history.replaceState({}, '', location.pathname)
    }
  }, [selectedCategory, location.pathname, location.search, categoryParam])

  // Apply filters
  useEffect(() => {
    let result = [...products]
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }
    
    // Filter by price range
    result = result.filter(product => {
      const finalPrice = product.discountedPrice || product.price
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1]
    })
    
    // Sort
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price))
        break
      case 'price-high-low':
        result.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price))
        break
      case 'rating':
        result.sort((a, b) => b.ratings - a.ratings)
        break
      default:
        // featured - no specific sorting
        break
    }
    
    setFilteredProducts(result)
  }, [products, selectedCategory, priceRange, sortOption])

  const categories = [
    { id: "clothing", name: "Clothing" },
    { id: "electronics", name: "Electronics" },
    { id: "accessories", name: "Accessories" },
    { id: "home", name: "Home & Garden" },
    { id: "beauty", name: "Beauty" }
  ]

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setIsFilterOpen(false)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (e.target.id === 'min-price') {
      setPriceRange([value, priceRange[1]])
    } else {
      setPriceRange([priceRange[0], value])
    }
  }

  const resetFilters = () => {
    setSelectedCategory(null)
    setPriceRange([0, 2000])
    setSortOption('featured')
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {selectedCategory 
              ? `${categories.find(c => c.id === selectedCategory)?.name || selectedCategory}` 
              : 'All Products'}
          </h1>
          
          <div className="flex items-center space-x-4">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <AdjustmentsIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            
            {/* View toggles */}
            <div className="hidden md:flex space-x-2">
              <button 
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-md ${isGridView ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500'}`}
                aria-label="Grid view"
              >
                <ViewGridIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-md ${!isGridView ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500'}`}
                aria-label="List view"
              >
                <ViewListIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Mobile filter button */}
            <button
              className="md:hidden p-2 bg-white rounded-md text-gray-500"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Open filters"
            >
              <FilterIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  className={`block w-full text-left py-1 ${selectedCategory === null ? 'text-indigo-600 font-medium' : 'text-gray-700'}`}
                  onClick={() => handleCategoryChange(null)}
                >
                  All Products
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`block w-full text-left py-1 ${selectedCategory === category.id ? 'text-indigo-600 font-medium' : 'text-gray-700'}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Price Range</h3>
              <div className="flex items-center space-x-4 mb-3">
                <div>
                  <label htmlFor="min-price" className="block text-sm text-gray-500">Min</label>
                  <div className="mt-1 relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="min-price"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={handlePriceChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="max-price" className="block text-sm text-gray-500">Max</label>
                  <div className="mt-1 relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="max-price"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={resetFilters}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
          
          {/* Mobile Filter Sidebar */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black opacity-25" onClick={() => setIsFilterOpen(false)}></div>
              <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <XIcon className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
                
                <div className="overflow-y-auto flex-1 p-6">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-3">Categories</h4>
                    <div className="space-y-2">
                      <button
                        className={`block w-full text-left py-1 ${selectedCategory === null ? 'text-indigo-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => handleCategoryChange(null)}
                      >
                        All Products
                      </button>
                      {categories.map(category => (
                        <button
                          key={category.id}
                          className={`block w-full text-left py-1 ${selectedCategory === category.id ? 'text-indigo-600 font-medium' : 'text-gray-700'}`}
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-3">Price Range</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="mobile-min-price" className="block text-sm text-gray-500">Min</label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            id="mobile-min-price"
                            min="0"
                            max={priceRange[1]}
                            value={priceRange[0]}
                            onChange={handlePriceChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="mobile-max-price" className="block text-sm text-gray-500">Max</label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            id="mobile-max-price"
                            min={priceRange[0]}
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t mt-auto">
                  <div className="flex space-x-3">
                    <button
                      onClick={resetFilters}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try changing your filters or search term.</p>
              </div>
            ) : isGridView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Link 
                    key={product._id} 
                    to={`/product/${product._id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                        <img 
                          src={product.images[0].url} 
                          alt={product.name} 
                          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <div className="mt-1 flex justify-between items-center">
                          <p className="text-xl font-semibold text-indigo-600">${product.discountedPrice?.toFixed(2) || product.price.toFixed(2)}</p>
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="text-sm text-gray-600">{product.ratings}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <Link 
                    key={product._id} 
                    to={`/product/${product._id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow p-4">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 md:h-48 flex-shrink-0">
                          <img 
                            src={product.images[0].url} 
                            alt={product.name} 
                            className="w-full h-48 object-cover object-center rounded-md group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="text-sm text-gray-600">{product.ratings}</span>
                          </div>
                          <p className="mt-2 text-gray-500 flex-grow">
                            {product.description}
                          </p>
                          <div className="mt-4">
                            <p className="text-xl font-semibold text-indigo-600">${product.discountedPrice?.toFixed(2) || product.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center">
              <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  8
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  9
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  10
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop 