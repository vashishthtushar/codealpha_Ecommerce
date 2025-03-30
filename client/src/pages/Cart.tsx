import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { XIcon, PlusIcon, MinusIcon, TrashIcon, ArrowRightIcon } from '@heroicons/react/outline'

interface CartProps {
  cartItems: any[]
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>
}

const Cart = ({ cartItems, setCartItems }: CartProps) => {
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  
  // Calculate totals whenever cart items change
  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce((total, item) => {
      const itemPrice = item.discount > 0 
        ? item.price * (1 - item.discount / 100) 
        : item.price
      return total + (itemPrice * item.quantity)
    }, 0)
    
    const calculatedShipping = calculatedSubtotal > 100 ? 0 : 10
    const calculatedTax = calculatedSubtotal * 0.08 // 8% tax rate
    const calculatedTotal = calculatedSubtotal + calculatedShipping + calculatedTax
    
    setSubtotal(calculatedSubtotal)
    setShipping(calculatedShipping)
    setTax(calculatedTax)
    setTotal(calculatedTotal)
  }, [cartItems])
  
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setCartItems(cartItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity } 
        : item
    ))
  }
  
  const handleRemoveItem = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, would validate coupon with backend
    alert('Coupon applied successfully!')
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <div className="max-w-md mx-auto">
          <svg 
            className="w-24 h-24 mx-auto text-gray-400 mb-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-600 mb-8">Your cart is empty. Add some products to see them here!</p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50 py-16">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-white p-4 rounded-t-lg border-b">
              <div className="col-span-6 font-medium text-gray-700">Product</div>
              <div className="col-span-2 text-center font-medium text-gray-700">Price</div>
              <div className="col-span-2 text-center font-medium text-gray-700">Quantity</div>
              <div className="col-span-2 text-right font-medium text-gray-700">Total</div>
            </div>
            
            {/* Cart Items */}
            <div className="bg-white rounded-b-lg mb-8">
              {cartItems.map(item => {
                const itemPrice = item.discount > 0 
                  ? item.price * (1 - item.discount / 100) 
                  : item.price
                const itemTotal = itemPrice * item.quantity
                
                return (
                  <div key={item.id} className="border-b last:border-b-0 p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Product */}
                      <div className="md:col-span-6 flex">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.images ? item.images[0] : item.image} 
                            alt={item.name} 
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-base font-medium text-gray-900">
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </h3>
                          <div className="mt-1 flex text-sm text-gray-500">
                            {item.selectedColor && (
                              <p className="mr-4">Color: {item.selectedColor}</p>
                            )}
                            {item.selectedSize && (
                              <p>Size: {item.selectedSize}</p>
                            )}
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-500 md:hidden"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 flex items-center justify-between md:block">
                        <div className="md:hidden text-sm font-medium text-gray-700">Price:</div>
                        <div className="text-center">
                          {item.discount > 0 ? (
                            <div>
                              <span className="text-indigo-600 font-medium">${itemPrice.toFixed(2)}</span>
                              <span className="ml-2 text-sm text-gray-500 line-through">${item.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-gray-900 font-medium">${itemPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between md:justify-center">
                          <div className="md:hidden text-sm font-medium text-gray-700">Quantity:</div>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:text-indigo-600"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-indigo-600"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                        <div className="md:hidden text-sm font-medium text-gray-700">Total:</div>
                        <div className="text-indigo-600 font-medium">${itemTotal.toFixed(2)}</div>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-4 hidden md:block text-gray-400 hover:text-gray-500"
                          aria-label="Remove item"
                        >
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Coupon Code */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Have a coupon?</h3>
              <form onSubmit={handleApplyCoupon} className="flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-grow border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply
                </button>
              </form>
            </div>
            
            {/* Continue Shopping */}
            <div className="text-center md:text-left">
              <Link 
                to="/shop" 
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <ArrowRightIcon className="h-4 w-4 mr-2 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-base text-gray-700">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between text-base text-gray-700">
                  <p>Shipping</p>
                  {shipping > 0 ? (
                    <p>${shipping.toFixed(2)}</p>
                  ) : (
                    <p className="text-green-600">Free</p>
                  )}
                </div>
                
                <div className="flex justify-between text-base text-gray-700">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {shipping === 0 ? (
                      "Free shipping applied!"
                    ) : (
                      "Spend $100 or more to get free shipping."
                    )}
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/checkout"
                  className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Proceed to Checkout
                </Link>
              </div>
              
              <div className="mt-4">
                <p className="flex items-center justify-center text-center text-sm text-gray-500">
                  <svg className="h-5 w-5 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart 