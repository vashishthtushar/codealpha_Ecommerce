import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon, MenuIcon, SearchIcon, XIcon } from '@heroicons/react/outline'

interface HeaderProps {
  cartItemsCount: number
}

const Header = ({ cartItemsCount }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            LuxeCart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-indigo-600 font-medium">
              Shop
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 font-medium">
                Categories
              </button>
              <div className="absolute hidden group-hover:block min-w-[200px] bg-white shadow-lg rounded-md p-4 mt-2">
                <Link to="/shop?category=clothing" className="block py-2 text-gray-700 hover:text-indigo-600">
                  Clothing
                </Link>
                <Link to="/shop?category=electronics" className="block py-2 text-gray-700 hover:text-indigo-600">
                  Electronics
                </Link>
                <Link to="/shop?category=home" className="block py-2 text-gray-700 hover:text-indigo-600">
                  Home & Garden
                </Link>
                <Link to="/shop?category=beauty" className="block py-2 text-gray-700 hover:text-indigo-600">
                  Beauty
                </Link>
              </div>
            </div>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              <SearchIcon className="w-6 h-6" />
            </button>

            {/* Account */}
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              <UserIcon className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600 relative">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-indigo-600"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 relative">
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <SearchIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white">
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <button 
                className="text-left text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => {}}
              >
                Categories
              </button>
              <div className="pl-4 space-y-2">
                <Link 
                  to="/shop?category=clothing" 
                  className="block text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clothing
                </Link>
                <Link 
                  to="/shop?category=electronics" 
                  className="block text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Electronics
                </Link>
                <Link 
                  to="/shop?category=home" 
                  className="block text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home & Garden
                </Link>
                <Link 
                  to="/shop?category=beauty" 
                  className="block text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Beauty
                </Link>
              </div>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-indigo-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 