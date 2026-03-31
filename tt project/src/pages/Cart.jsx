import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import api from '../utils/api'
import './Cart.css'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart')
      setCartItems(response.data.items || [])
    } catch (error) {
      console.log('[v0] Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId)
      return
    }

    try {
      await api.put(`/cart/${itemId}`, { quantity: newQuantity })
      fetchCart()
    } catch (error) {
      console.log('[v0] Failed to update quantity:', error)
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`)
      fetchCart()
    } catch (error) {
      console.log('[v0] Failed to remove item:', error)
    }
  }

  const handleCheckout = async () => {
    setCheckingOut(true)
    try {
      const response = await api.post('/orders', {
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        }))
      })
      alert('Order placed successfully! Order ID: ' + response.data.order_id)
      setCartItems([])
      navigate('/buyer-dashboard')
    } catch (error) {
      console.log('[v0] Checkout error:', error)
      alert(error.response?.data?.message || 'Checkout failed')
    } finally {
      setCheckingOut(false)
    }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.05)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  return (
    <div className="cart-page">
      <Header />
      
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {loading ? (
          <div className="loading">Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/')} className="btn-continue">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="seller">{item.farmer_name}</p>
                    <p className="price">₹{item.price} per {item.unit || 'kg'}</p>
                  </div>
                  <div className="quantity-control">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                    <input type="number" value={item.quantity} onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))} />
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-total">
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="btn-remove">Remove</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Tax (5%)</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="summary-line discount">
                <span>Delivery Fee</span>
                <span>Free</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="btn-checkout"
              >
                {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <button onClick={() => navigate('/')} className="btn-continue-shopping">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
