import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/solid'

interface CheckoutProps {
  cartItems: any[]
}

const Checkout = ({ cartItems }: CheckoutProps) => {
  const [activeStep, setActiveStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savePaymentInfo: false,
    
    // Other
    sameShippingAddress: true,
    orderNotes: ''
  })

  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount > 0 
      ? item.price * (1 - item.discount / 100) 
      : item.price
    return total + (itemPrice * item.quantity)
  }, 0)
  
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (activeStep === 1) {
      setActiveStep(2)
      window.scrollTo(0, 0)
    } else {
      // In a real app, would submit order to backend
      alert('Order placed successfully!')
    }
  }

  const handleBack = () => {
    if (activeStep === 2) {
      setActiveStep(1)
      window.scrollTo(0, 0)
    }
  }

  // If cart is empty, redirect to shop
  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
        <p className="text-gray-600 mb-8">Your cart is empty. Add some products before proceeding to checkout.</p>
        <Link to="/shop" className="btn btn-primary">
          Go to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activeStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                1
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700">Shipping</div>
            </div>

            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div 
                className="h-full bg-indigo-600" 
                style={{ width: activeStep > 1 ? '100%' : '0%', transition: 'width 0.3s ease' }}
              ></div>
            </div>

            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activeStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                2
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700">Payment</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {activeStep === 1 ? (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP / Postal code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                    </div>
                    
                    <div className="mb-8">
                      <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">
                        Order Notes (optional)
                      </label>
                      <textarea
                        id="orderNotes"
                        name="orderNotes"
                        rows={3}
                        value={formData.orderNotes}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Notes about your order, e.g. special delivery instructions."
                      ></textarea>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                    
                    <div className="mb-8">
                      <fieldset>
                        <legend className="sr-only">Payment type</legend>
                        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                          <div className="flex items-center">
                            <input
                              id="creditCard"
                              name="paymentType"
                              type="radio"
                              defaultChecked
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
                              Credit Card
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="paypal"
                              name="paymentType"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                              PayPal
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <div className="flex items-center">
                        <input
                          id="savePaymentInfo"
                          name="savePaymentInfo"
                          type="checkbox"
                          checked={formData.savePaymentInfo}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="savePaymentInfo" className="ml-2 block text-sm text-gray-700">
                          Save this card for future purchases
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        id="sameShippingAddress"
                        name="sameShippingAddress"
                        type="checkbox"
                        checked={formData.sameShippingAddress}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="sameShippingAddress" className="ml-2 block text-sm text-gray-700">
                        Billing address is the same as shipping address
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between mt-8">
                  {activeStep === 2 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="mb-4 sm:mb-0 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back to Shipping
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      activeStep === 1 ? 'ml-auto' : ''
                    }`}
                  >
                    {activeStep === 1 ? 'Continue to Payment' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-6">
                {cartItems.map(item => {
                  const itemPrice = item.discount > 0 
                    ? item.price * (1 - item.discount / 100) 
                    : item.price
                  
                  return (
                    <div key={item.id} className="flex py-4 border-b last:border-b-0">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.images ? item.images[0] : item.image} 
                          alt={item.name} 
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm font-medium text-gray-900">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-gray-500">
                            Qty {item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${itemPrice.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
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
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <LockClosedIcon className="h-5 w-5 text-gray-400 mr-1.5" />
                <p className="text-sm text-gray-500">
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

export default Checkout 