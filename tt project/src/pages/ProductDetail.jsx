import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'
import api from '../utils/api'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data.product)
    } catch (error) {
      console.log('[v0] Failed to fetch product:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setAddingToCart(true)
    setMessage('')

    try {
      await api.post('/cart/add', {
        product_id: id,
        quantity: parseInt(quantity)
      })
      setMessage('Product added to cart successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add to cart')
      console.log('[v0] Add to cart error:', error)
    } finally {
      setAddingToCart(false)
    }
  }

  const handleContactFarmer = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      await api.post('/messages', {
        receiver_id: product.farmer_id,
        message: `Hi, I am interested in your product: ${product.name}`
      })
      setMessage('Message sent to farmer!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.log('[v0] Message error:', error)
    }
  }

  if (loading) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="loading">Loading product details...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="empty-state">Product not found</div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <Header />
      
      <div className="product-detail-container">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>

        <div className="product-detail-grid">
          <div className="product-image-section">
            <img
              src={product.image || 'https://via.placeholder.com/500'}
              alt={product.name}
            />
          </div>

          <div className="product-details-section">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>
            
            <div className="rating">
              <span className="stars">★★★★★</span>
              <span className="reviews">(4.5/5 - 23 reviews)</span>
            </div>

            <div className="price-section">
              <span className="price">₹{product.price}</span>
              <span className="unit">per {product.unit || 'kg'}</span>
            </div>

            <p className="description">{product.description}</p>

            <div className="product-specs">
              <div className="spec">
                <span className="label">Farmer:</span>
                <span className="value">{product.farmer_name}</span>
              </div>
              <div className="spec">
                <span className="label">Location:</span>
                <span className="value">{product.location || 'N/A'}</span>
              </div>
              <div className="spec">
                <span className="label">Available:</span>
                <span className="value">{product.quantity} {product.unit || 'kg'}</span>
              </div>
              <div className="spec">
                <span className="label">Certified Organic:</span>
                <span className="value">{product.is_organic ? 'Yes' : 'No'}</span>
              </div>
            </div>

            {message && <div className="success-message">{message}</div>}

            <div className="action-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-input">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="btn-add-cart"
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>

              <button
                onClick={handleContactFarmer}
                className="btn-contact"
              >
                Contact Farmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
